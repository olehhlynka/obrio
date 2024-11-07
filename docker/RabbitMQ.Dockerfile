FROM rabbitmq:4.0-management

RUN apk --no-cache add curl

RUN curl -L https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v4.0.2/rabbitmq_delayed_message_exchange-4.0.2.ez > rabbitmq_delayed_message_exchange-4.0.2.ez && \
mv rabbitmq_delayed_message_exchange-4.0.2.ez plugins/

RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange
RUN rabbitmq-plugins enable rabbitmq_management