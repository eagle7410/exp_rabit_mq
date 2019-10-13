
const {
	connect,
	assertQueue,
	createChannel,
	sendToQueue,
} = require('./amqp');

(async () => {
	try {
		const queue = 'test';
		const conn = await connect('amqp://user:password@localhost');
		const channel = await createChannel(conn);
		channel.consume(queue, function(msg) {
			console.log(" [x] Received %s", msg.content.toString());
		}, {
			noAck: true
		});
	} catch (e) {
		console.error("Err is", e);
	}
})();
