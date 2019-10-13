
const amqp = require('amqplib/callback_api');

/**
 *
 * @param uri
 * @returns {Promise<{Object}>}
 */
const connect = (uri) => new Promise((ok, bad) => {
	amqp.connect(uri, (error, connection) => {
		if (error) return bad(error);
		// TODO: clear
		console.log('Ready Connect');
		ok(connection)
		// connection.on('ready', () => ok(connection));
	});
});

const createChannel = (connection) => new Promise((ok, bad) => {
	connection.createConfirmChannel(function(error1, channel) {
		if (error1) return bad(error1);
		ok(channel)
	});
});

const assertQueue = (channel, queueName) => new Promise((ok) => {
	channel.assertQueue(queueName);
	ok();
});

const sendToQueue = (channel, queueName, msg) => new Promise((ok, bad) => {
	channel.sendToQueue(queueName, Buffer.from(msg), {}, function(err) {
		if (err) return bad(err);
		ok()
	});
});


module.exports = {
	sendToQueue,
	assertQueue,
	createChannel,
	connect,
};
