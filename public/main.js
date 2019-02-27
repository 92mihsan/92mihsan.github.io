var webPush = require ('web-push');

var pushSubscription = {
	"endpoint": "https://android.googleapis.com/gcm/send/dVrYDl81EU8:APA91bGonEimp6HaC5AlgorJzo_boJn8mZiYKJahs9Lf_rOerExyuATgdg4Q12TM1w0GRm_xZI8muvpFfwXfyHLKM7mnXPk6cD33AWT1eKx0b4jetzlvYPxsSW9pW_ahxqftWP0BdLIN",
	"keys": {
		"p256dh":"BEYXENN4cDU7KP9c74N8L8oKOEm0ZedLN4N8hpXGSi2mnEzfaRxUj2OfnTVaoURUEi6nVkYD4prOXTL4dgZfXc4=",
		"auth":"tU/KS9uBp+tjWN6iIwEeQA=="
	}
};

var playload = 'Here is a playload';

var options = {
	gcmAPIKey: 'AAAAFbRhBVc:APA91bFBcGPW0ebUtT8d5a8M7oeNK3neX0-UsJ80iEZDGWb-NyTnze3n1ZFazaWLKgC5W74aO2G9F-RxSJus4oWwOFGv2rOBOYp330j0XbcD-LYwMyrKyWoOue-SqX7A3IbGGGMGClcl',
	TTL:60
};

webPush.sendNotification(
	pushSubscription,
	playload,
	options
);
