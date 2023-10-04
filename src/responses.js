const users = {};

// respond with head and body
const respondJSON = (request, response, status, obj) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(obj));
  response.end();
};

// respond with just the head metadata
const respondMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const obj = {
    users,
  };

  respondJSON(request, response, 200, obj);
};

const getUsersMeta = (request, response) => {
  respondMeta(request, response, 200);
};

const updateUsers = (request, response, body) => {
  // assume missing fields
  const obj = {
    message: 'Name and Age are both required',
  };

  if (!body.name || !body.age) {
    obj.id = 'missingParams';
    return respondJSON(request, response, 400, obj);
  }

  let statusCode = 204;

  // create new user if they don't exist
  if (!users[body.name]) {
    statusCode = 201;
    users[body.name] = {};
  }

  // update user
  const currentUser = users[body.name];
  currentUser.name = body.name;
  currentUser.age = body.age;

  if (statusCode === 201) {
    obj.message = 'Created Successfully';
    return respondJSON(request, response, statusCode, obj);
  }

  return respondMeta(request, response, statusCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
}

module.exports = {
  getUsers,
  getUsersMeta,
  updateUsers,
  notFound,
};
