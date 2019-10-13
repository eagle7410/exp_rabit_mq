
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
		await assertQueue(channel, queue);

		for (var i = 0, len = 20; i<len; ++i) {
			const msg = `Test at ${(new Date).toLocaleString()}`;
			await sendToQueue(channel, queue, msg);
			console.log(" [%s] Sent %s",i, msg);
		}

	} catch (e) {
		console.error("Err is", e);
	} finally {
		process.exit()
	}
})();
