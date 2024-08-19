const types = require('pg').types;
types.setTypeParser(20, function(value){
  return parseInt(value, 10)
})
const { strParseOut, batchDeletePictures } = require('../utils/utility-functions');
const { deleteFolder, getFolder } = require('../utils/cloudinary');

function getClientDetailStructure (client) {
  return {
    clientId: client.client_id,
    ownerStructuredData: [
      { clientName: client.name },
      { clientContactPhone: client.contact_phone },
      { age: client.age },
      { clientDetails: client.client_details }
    ]
  }
}

function getClientDataUnstructured (client) {
  return {
    clientId: client.client_id,
    clientName: strParseOut(client.name),
    clientContactPhone: client.contact_phone,
    clientAge: client.age,
    clientDetails: client.client_details,
    clientType: client.client_type
  }
}

async function getOneClient (knex, params) {
  const { userid, clientid } = params;
  try {

    const client = await knex.select('*')
    .from('clients')
    .where('clients.user_id', '=', userid)
    .andWhere('clients.client_id', '=', clientid)
    .returning('*');

    const clientUnstructuredData = getClientDataUnstructured(client[0])
    console.log('clientUnstructuredData: ', clientUnstructuredData);

    return clientUnstructuredData;

  } catch (err) {
    throw new Error(err)
  }
}

async function getAllClients (knex, params) {
  const { userid } = params
  try {
    const clients = await knex.select('client_id', 'name', 'contact_phone', 'client_type')
    .from('clients')
    .where('clients.user_id', '=', userid)
    .returning('*');

    const formattedClients = clients.map(client => ({
      clientId: client.client_id,
      clientName: strParseOut(client.name),
      clientContactPhone: client.contact_phone,
    }))

    console.log('formattedClients: ', formattedClients);

    return formattedClients; 
    
  } catch (error) {
    throw error
  }
}

async function updateOneClient (knex, params, clientData, t, clientLang) {
  const { userid, clientid } = params;
  const {
    clientName,
    clientContactPhone,
    clientAge,
    clientDetails,
    clientType
  } = clientData;
  try {
    const updatedClient = await knex.insert({
      client_id: clientid,
      user_id: userid,
      name: clientName,
      contact_phone: clientContactPhone,
      age: clientAge,
      client_details: clientDetails,
      client_type: clientType
    })
      .into('clients')
      .where('clients.user_id', '=', userid)
      .onConflict('client_id')
      .merge()
      .returning('*');

    const clientUnstructuredData = getClientDataUnstructured(updatedClient[0]);
    return clientUnstructuredData;
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}

async function deleteOneClient (identifiers, userType, knexInstance) {
  try {
    const { userId, clientId } = identifiers;

    const clientEstates = await knexInstance('estates')
      .select('estate_id')
      .where('client_id', clientId)
      .returning('*');

    const deletedFolders = await Promise.all(clientEstates.map(async est => {
      identifiers.estateId = est.estate_id // this creates a side effect

      const deletedPicturesFromCloudinary = await batchDeletePictures('estate_id', identifiers, userType, knexInstance);
      console.log('deletedPicturesFromCloudinary: ', deletedPicturesFromCloudinary);

      const deleted = await deleteFolder(getFolder('estate', userId, est.estate_id));
      return deleted;
    }));
    console.log('deletedFolders: ', deletedFolders);


    const [ deletedClient ] = await knexInstance('clients')
      .where('user_id', userId)
      .andWhere('client_id', clientId)
      .del()
      .returning('*')

    console.log('deletedClient: ', deletedClient);

    return Number(deletedClient.client_id)

  } catch (error) {
    console.log(error)
    throw new Error({ error });
  }
}

module.exports = {
  getOneClient,
  getAllClients,
  updateOneClient,
  deleteOneClient
}
