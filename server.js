const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { DynamoDBClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/client-dynamodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dynamoDBClient = new DynamoDBClient({ region: 'ap-southeast-2' }); // Replace with your AWS region
const dynamoDBTableName = 'student'; // Replace with your DynamoDB table name

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.get('/employees', async (req, res) => {
  try {
    // Fetch data from DynamoDB
    const params = {
      TableName: dynamoDBTableName,
    };
    const dynamoDBData = await dynamoDBClient.send(new ScanCommand(params));

    res.json(dynamoDBData.Items);
  } catch (error) {
    console.error('Error fetching employees', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getemployee/:index', async (req, res) => {
  const index = req.params.index;

  try {
    // Fetch data from DynamoDB
    const params = {
      TableName: dynamoDBTableName,
      Key: {
        employeeId: { S: companyData.employees[index].employeeId }, // Assuming 'employeeId' is a string attribute
      },
    };
    const dynamoDBData = await dynamoDBClient.send(new GetCommand(params));

    if (dynamoDBData.Item) {
      res.json(dynamoDBData.Item);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error fetching employee details', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/employees', async (req, res) => {
  const newEmployee = req.body;

  try {
    // Add data to DynamoDB
    const params = {
      TableName: dynamoDBTableName,
      Item: newEmployee,
    };
    await dynamoDBClient.send(new PutCommand(params));

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error adding employee to DynamoDB', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/employees/:index', async (req, res) => {
  const employeeId = req.params.index;
  const updatedEmployee = req.body;

  try {
    // Update data in DynamoDB
    const params = {
      TableName: dynamoDBTableName,
      Key: {
        employeeId: { S: companyData.employees[employeeId].employeeId }, // Assuming 'employeeId' is a string attribute
      },
      UpdateExpression: 'set #name = :name, #position = :position',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#position': 'position',
      },
      ExpressionAttributeValues: {
        ':name': { S: updatedEmployee.name }, // Assuming 'name' is a string attribute
        ':position': { N: updatedEmployee.position.toString() }, // Assuming 'position' is a number attribute
      },
    };

    await dynamoDBClient.send(new UpdateCommand(params));

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee in DynamoDB', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/employees/:index', async (req, res) => {
  const employeeId = req.params.index;

  try {
    // Delete data from DynamoDB
    const params = {
      TableName: dynamoDBTableName,
      Key: {
        employeeId: { S: companyData.employees[employeeId].employeeId }, // Assuming 'employeeId' is a string attribute
      },
    };

    await dynamoDBClient.send(new DeleteCommand(params));

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting employee from DynamoDB', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
