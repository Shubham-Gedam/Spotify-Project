import amqp from 'amqplib';
import config from '../config/config.js';

let channel, connection;

export async function connect() {

    connection = await amqp.connect(config.RABBITMQ_URL);
    channel = await connection.createChannel();

    console.log("connected to rabbit mq");
    
}


export function publishToQueue(queueName, data) {
    channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

    console.log("published to queue ", queueName);
}

export async function subscribeToQueue(queueName, callback) {
    
    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (msg) => {
        await callback(JSON.parse(msg.content.toString()));
        await channel.ack(msg);
    })
}