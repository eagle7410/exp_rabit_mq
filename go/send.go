package main

import (
	"fmt"
	"github.com/streadway/amqp"
	"time"
)
func send (ch *amqp.Channel, q *amqp.Queue) {
	msg := fmt.Sprintf("Test at %v", time.Now().Format(time.RFC3339))

	err := ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing {
			ContentType: "text/plain",
			Body:        []byte(msg),
		})
	failOnError(err, "Failed to publish a message")
}

func main() {
	conn, ch, q := getConnChannelQueue()

	defer func () {
		conn.Close()
		ch.Close()
	}()

	for i := 0; i<20 ; i++  {
		send(ch, q)
	}
}


