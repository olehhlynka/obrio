import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    this.connection = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.RABBITMQ_HOST || 'localhost',
      port: parseInt(process.env.RABBITMQ_PORT, 10) || 5672,
      username: process.env.RABBITMQ_USER || 'guest',
      password: process.env.RABBITMQ_PASSWORD || 'guest',
    });
    this.channel = await this.connection.createChannel();
    console.log('Connected to RabbitMQ');
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
    console.log('Disconnected from RabbitMQ');
  }

  async sendToQueue(queue: string, message: unknown) {
    await this.channel.assertQueue(queue, { durable: true });
    return this.channel.sendToQueue(queue, Buffer.from(String(message)));
  }

  async consume(
    queue: string,
    callback: (msg: amqp.ConsumeMessage | null) => void,
  ) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, callback, { noAck: true });
  }
}
