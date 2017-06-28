$(function() {
	var app_id = "359042"
	var key = "44f522b8df5a8a3ccf74"
	var secret = "d8d561e9aafb45f2ff14"
	var cluster = "us2"

	var channelName = 'channel';

	var pusher = new Pusher(key, {
        cluster: cluster,
        encrypted: true
	});
	// Pusher.log = function(message) {
	// 	if (window.console && window.console.log) {
	// 		window.console.log(message);
	// 	}
	// };

	var channel = pusher.subscribe('private-'+channelName);

	// channel.bind('message', function(data) {
	// 	console.log(data);
	// });
	// channel.bind('subscription_succeeded', function(data) {
	// 	console.log(data);
	// });

    channel.trigger('client-message', {
        type: 'text',
        message: 'hello world'
    });

	window.channel = channel;
});