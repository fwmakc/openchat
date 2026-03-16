# OpenChat API Specification

Протокол взаимодействия между клиентом и сервером.

---

## Транспорт

- **Протокол**: WebSocket (основной) + HTTP (fallback)
- **Формат данных**: JSON (по умолчанию) или MessagePack (опционально)

### Установка соединения

**WebSocket URL:**
```
wss://server.com/ws
```

**Порядок подключения:**
1. Клиент открывает WebSocket
2. Handshake (формат данных, версия)
3. Аутентификация (подключение к чату)
4. Обмен сообщениями

### Идентификация в запросах

После аутентификации каждый запрос содержит `connectionId`:

```json
{
  "type": "message.send",
  "connectionId": "connection-uuid",
  "data": {
    ...
  }
}
```

Сервер связывает `connectionId` с email и публичным ключом.

Для запросов до аутентификации — email передаётся в `data`.

### Формат данных

**JSON** — по умолчанию, для совместимости и отладки.

**MessagePack** — опционально, для экономии трафика (~40% меньше):
- Клиент запрашивает при подключении: `{"type": "handshake", "data": {"format": "msgpack"}}`
- Если сервер поддерживает — все дальнейшие сообщения в MessagePack
- Если нет — fallback на JSON

### Request ID

Все запросы могут содержать `requestId` для корреляции:

```json
{
  "type": "message.send",
  "requestId": "client-uuid-123",
  "connectionId": "connection-uuid",
  "data": { ... }
}
```

Ответ на такой запрос содержит тот же `requestId`:

```json
{
  "type": "message.send.success",
  "requestId": "client-uuid-123",
  "data": { ... }
}
```

### Handshake

**Запрос:**
```json
{
  "type": "handshake",
  "requestId": "client-uuid-123",
  "data": {
    "format": "json" | "msgpack",
    "version": "1.0"
  }
}
```

**Ответ:**
```json
{
  "type": "handshake.success",
  "requestId": "client-uuid-123",
  "data": {
    "format": "json" | "msgpack",
    "version": "1.0",
    "pingInterval": 30000,
    "pongTimeout": 10000
  }
}
```

### Heartbeat (Ping/Pong)

**Запрос (клиент → сервер):**
```json
{
  "type": "ping",
  "requestId": "ping-123"
}
```

**Ответ:**
```json
{
  "type": "pong",
  "requestId": "ping-123",
  "data": {
    "timestamp": 1234567890
  }
}
```

Если клиент не отправляет ping в течение `pingInterval * 1.5`, сервер закрывает соединение.
Если сервер не отвечает на ping в течение `pongTimeout`, клиент считает соединение разорванным.

---

## Базовые запросы

### Информация о сервере

**Запрос:**
```json
{
  "type": "server.info"
}
```

**Ответ:**
```json
{
  "type": "server.info.success",
  "data": {
    "url": "https://server.com",
    "name": "My OpenChat Server",
    "description": "Friendly chat server",
    "icon": "base64-encoded-image",
    "version": "1.0.0",
    "features": ["msgpack", "webrtc"],
    "limits": {
      "maxUsers": 1000,
      "maxMessageSize": 65536,
      "rateLimit": 100
    }
  }
}
```

### Список чатов на сервере

**Запрос:**
```json
{
  "type": "server.chats"
}
```

**Ответ:**
```json
{
  "type": "server.chats.success",
  "data": {
    "chats": [
      {
        "chatId": "chat-uuid",
        "name": "General",
        "description": "General discussion",
        "icon": "base64-encoded-image",
        "type": "public" | "protected",
        "visible": true,
        "allowJoin": true,
        "settings": {
          "maxUsers": 100,
          "messageSize": 4096,
          "historyLimit": 1000,
          "allowedContentTypes": ["text", "media", "poll"]
        },
        "userCount": 10
      }
    ]
  }
}
```

### Проверка пользователя

**Запрос:**
```json
{
  "type": "user.check",
  "data": {
    "email": "bob@gmail.com"
  }
}
```

**Ответ:**
```json
{
  "type": "user.check.success",
  "data": {
    "exists": true,
    "profile": {
      "email": "bob@gmail.com",
      "nickname": "bob",
      "firstName": "Bob",
      "lastName": "Smith",
      "middleName": "John",
      "birthday": "1990-01-15",
      "avatar": "base64-encoded-image",
      "status": "online" | "offline" | "away",
      "allowFind": true
    },
    "chats": ["chat-uuid-1", "chat-uuid-2"]
  }
}
```

### Профиль пользователя

**Запрос:**
```json
{
  "type": "user.profile",
  "data": {
    "email": "alice@gmail.com"
  }
}
```

**Ответ:**
```json
{
  "type": "user.profile.success",
  "data": {
    "email": "alice@gmail.com",
    "nickname": "alice",
    "firstName": "Alice",
    "lastName": "Johnson",
    "middleName": "Marie",
    "birthday": "1992-05-20",
    "avatar": "base64-encoded-image",
    "status": "online",
    "allowFind": true
  }
}
```

### Обновить свой профиль

**Запрос:**
```json
{
  "type": "user.profile.update",
  "connectionId": "connection-uuid",
  "data": {
    "nickname": "alice",
    "firstName": "Alice",
    "lastName": "Johnson",
    "middleName": "Marie",
    "birthday": "1992-05-20",
    "avatar": "base64-encoded-image",
    "status": "online",
    "allowFind": true
  }
}
```

**Ответ:**
```json
{
  "type": "user.profile.update.success",
  "data": {
    "email": "alice@gmail.com",
    "nickname": "alice",
    "firstName": "Alice",
    "lastName": "Johnson",
    "middleName": "Marie",
    "birthday": "1992-05-20",
    "avatar": "base64-encoded-image",
    "status": "online",
    "allowFind": true
  }
}
```

### Список чатов пользователя

**Запрос:**
```json
{
  "type": "user.chats",
  "data": {
    "email": "alice@gmail.com"
  }
}
```

**Ответ:**
```json
{
  "type": "user.chats.success",
  "data": {
    "chats": [
      {
        "chatId": "chat-uuid",
        "name": "Chat name",
        "description": "Chat description",
        "icon": "base64-encoded-image",
        "type": "public" | "protected",
        "visible": true,
        "allowJoin": true,
        "settings": {
          "maxUsers": 100,
          "messageSize": 4096,
          "historyLimit": 1000,
          "allowedContentTypes": ["text", "media", "poll"]
        },
        "userCount": 10,
        "unreadCount": 5
      }
    ]
  }
}
```

---

## Аутентификация

### Подключение к чату

**Запрос:**
```json
{
  "type": "auth.connect",
  "data": {
    "email": "alice@gmail.com",
    "chatId": "chat-uuid",
    "publicKey": "base64-encoded-public-key"
  }
}
```

**Ответ (успех):**
```json
{
  "type": "auth.connect.success",
  "data": {
    "connectionId": "connection-uuid",
    "encryptedChatKey": "base64-encoded-encrypted-key",
    "chatSettings": { ... }
  }
}
```

После успешной аутентификации `connectionId` используется во всех последующих запросах.

**Ответ (требуется верификация email):**
```json
{
  "type": "auth.verify_required",
  "data": {
    "challenge": "verification-code-or-link"
  }
}
```

### Подтверждение email

**Запрос:**
```json
{
  "type": "auth.verify",
  "data": {
    "email": "alice@gmail.com",
    "chatId": "chat-uuid",
    "publicKey": "base64-encoded-public-key",
    "code": "123456"
  }
}
```

**Ответ:**
```json
{
  "type": "auth.verify.success",
  "data": {
    "connectionId": "connection-uuid",
    "encryptedChatKey": "base64-encoded-encrypted-key"
  }
}
```

**Ответ (код истёк):**
```json
{
  "type": "error",
  "data": {
    "code": "CODE_EXPIRED",
    "message": "Verification code has expired"
  }
}
```

> **TTL кодов верификации:** по умолчанию 15 минут. Настраивается на сервере.

### Отключение от чата (logout)

**Запрос:**
```json
{
  "type": "auth.disconnect",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "auth.disconnect.success",
  "data": {
    "connectionId": "connection-uuid"
  }
}
```

### Отзыв подключения (устройства)

Отзывает конкретное подключение. Если отзывает владелец email — отзывает своё. Если модератор/owner чата — отзывает чужое в рамках чата.

**Запрос:**
```json
{
  "type": "connection.revoke",
  "connectionId": "connection-uuid",
  "data": {
    "targetConnectionId": "connection-uuid-to-revoke",
    "chatId": "chat-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "connection.revoke.success",
  "data": {
    "connectionId": "revoked-connection-uuid"
  }
}
```

**Server push (отозванному клиенту):**
```json
{
  "type": "connection.revoked",
  "data": {
    "chatId": "chat-uuid",
    "reason": "user_revoked" | "moderator_revoked"
  }
}
```

---

## Сообщения

### Отправка сообщения

**Запрос:**
```json
{
  "type": "message.send",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "client-generated-uuid",
    "contentType": "text",
    "content": "encrypted-content-base64",
    "timestamp": 1234567890
  }
}
```

**Ответ:**
```json
{
  "type": "message.send.success",
  "data": {
    "messageId": "client-generated-uuid",
    "serverTimestamp": 1234567890
  }
}
```

### Редактирование сообщения

**Запрос:**
```json
{
  "type": "message.edit",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid",
    "content": "new-encrypted-content-base64"
  }
}
```

**Ответ:**
```json
{
  "type": "message.edit.success",
  "data": {
    "messageId": "message-uuid",
    "serverTimestamp": 1234567890
  }
}
```

**Server push (всем в чате):**
```json
{
  "type": "message.edited",
  "data": {
    "messageId": "message-uuid",
    "chatId": "chat-uuid",
    "content": "new-encrypted-content-base64",
    "editedAt": 1234567890
  }
}
```

> **Права:** участник редактирует только свои сообщения. Модератор/owner — любые.

### Удаление сообщения

**Запрос:**
```json
{
  "type": "message.delete",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "message.delete.success",
  "data": {
    "messageId": "message-uuid"
  }
}
```

**Server push (всем в чате):**
```json
{
  "type": "message.deleted",
  "data": {
    "messageId": "message-uuid",
    "chatId": "chat-uuid",
    "deletedBy": "bob@gmail.com"
  }
}
```

> **Права:** участник удаляет только свои сообщения. Модератор/owner — любые.

### Получение сообщения (server push)

**От сервера:**
```json
{
  "type": "message.receive",
  "data": {
    "messageId": "server-uuid",
    "chatId": "chat-uuid",
    "senderEmail": "bob@gmail.com",
    "senderConnectionId": "connection-uuid",
    "contentType": "text",
    "content": "encrypted-content-base64",
    "timestamp": 1234567890
  }
}
```

### Подтверждение статуса

**Запрос:**
```json
{
  "type": "message.status",
  "connectionId": "connection-uuid",
  "data": {
    "messageId": "message-uuid",
    "status": "delivered" | "read"
  }
}
```

**Ответ:**
```json
{
  "type": "message.status.success",
  "data": {
    "messageId": "message-uuid",
    "status": "delivered"
  }
}
```

---

## Чаты

### Создание чата

**Запрос:**
```json
{
  "type": "chat.create",
  "connectionId": "connection-uuid",
  "data": {
    "name": "General Discussion",
    "description": "Chat for general topics",
    "icon": "base64-encoded-image",
    "type": "public" | "protected",
    "visible": true,
    "allowJoin": true,
    "settings": {
      "maxUsers": 100,
      "messageSize": 4096,
      "historyLimit": 1000,
      "allowedContentTypes": ["text", "media", "poll"]
    }
  }
}
```

**Ответ:**
```json
{
  "type": "chat.create.success",
  "data": {
    "chatId": "chat-uuid",
    "encryptedChatKey": "base64-encoded-encrypted-key"
  }
}
```

### Информация о чате

**Запрос:**
```json
{
  "type": "chat.info",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "chat.info.success",
  "data": {
    "chatId": "chat-uuid",
    "name": "General Discussion",
    "description": "Chat for general topics",
    "icon": "base64-encoded-image",
    "type": "public" | "protected",
    "visible": true,
    "allowJoin": true,
    "settings": {
      "maxUsers": 100,
      "messageSize": 4096,
      "historyLimit": 1000,
      "allowedContentTypes": ["text", "media", "poll"]
    },
    "users": [
      {
        "email": "alice@gmail.com",
        "nickname": "alice",
        "connections": 2,
        "role": "owner" | "moderator" | "member" | "observer"
      }
    ]
  }
}
```

### Обновление настроек чата

**Запрос:**
```json
{
  "type": "chat.update",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "name": "New Name",
    "description": "New description",
    "icon": "base64-encoded-image",
    "visible": true,
    "allowJoin": false,
    "settings": {
      "maxUsers": 200,
      "messageSize": 8192
    }
  }
}
```

**Ответ:**
```json
{
  "type": "chat.update.success",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

### Удаление чата

> **Права:** только owner. В публичном чате — любой участник может удалить (равноправие).

**Запрос:**
```json
{
  "type": "chat.delete",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "chat.delete.success",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

**Server push (всем в чате):**
```json
{
  "type": "chat.deleted",
  "data": {
    "chatId": "chat-uuid",
    "deletedBy": "alice@gmail.com"
  }
}
```

---

## История

### Получение истории

**Запрос:**
```json
{
  "type": "messages.history",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "from": "message-uuid",
    "limit": 50
  }
}
```

**Ответ:**
```json
{
  "type": "messages.history.success",
  "data": {
    "messages": [
      {
        "messageId": "message-uuid",
        "chatId": "chat-uuid",
        "senderEmail": "bob@gmail.com",
        "senderConnectionId": "connection-uuid",
        "contentType": "text",
        "content": "encrypted-content-base64",
        "timestamp": 1234567890,
        "editedAt": 1234567900,
        "deleted": false
      }
    ],
    "hasMore": true
  }
}
```

---

## Пользователи в чате

### Проверка пользователя в чате

**Запрос:**
```json
{
  "type": "chat.users.check",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com"
  }
}
```

**Ответ:**
```json
{
  "type": "chat.users.check.success",
  "data": {
    "exists": true,
    "role": "member"
  }
}
```

### Список пользователей

**Запрос:**
```json
{
  "type": "chat.users.list",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "chat.users.list.success",
  "data": {
    "users": [
      {
        "email": "alice@gmail.com",
        "nickname": "alice",
        "firstName": "Alice",
        "lastName": "Smith",
        "avatar": "base64-encoded-image",
        "status": "online",
        "connectionIds": [
          { "connectionId": "uuid", "connectedAt": 1234567890 }
        ],
        "role": "owner"
      }
    ]
  }
}
```

### Изменение роли (только защищённый чат)

**Запрос:**
```json
{
  "type": "chat.users.set_role",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com",
    "role": "moderator"
  }
}
```

**Ответ:**
```json
{
  "type": "chat.users.set_role.success",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com",
    "role": "moderator"
  }
}
```

### Приглашение в чат

**Правила:**
- Публичный чат: любой пользователь может пригласить
- Защищённый чат: только владелец/модератор может пригласить

**Запрос:**
```json
{
  "type": "chat.invite",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com",
    "role": "member" | "observer"
  }
}
```

**Ответ:**
```json
{
  "type": "chat.invite.success",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com"
  }
}
```

**Server push (уведомление приглашённому):**
```json
{
  "type": "user.invited",
  "data": {
    "chatId": "chat-uuid",
    "chatName": "General Discussion",
    "inviterEmail": "alice@gmail.com",
    "role": "member"
  }
}
```

### Выход из чата

**Запрос:**
```json
{
  "type": "chat.leave",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "chat.leave.success",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

### Исключение из чата (только владелец/модератор)

**Запрос:**
```json
{
  "type": "chat.remove",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com"
  }
}
```

**Ответ:**
```json
{
  "type": "chat.remove.success",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com"
  }
}
```

---

## Реакции

### Поставить реакцию

**Запрос:**
```json
{
  "type": "reaction.add",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid",
    "reaction": "👍"
  }
}
```

**Ответ:**
```json
{
  "type": "reaction.add.success",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid",
    "reaction": "👍"
  }
}
```

### Удалить реакцию

**Запрос:**
```json
{
  "type": "reaction.remove",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid",
    "reaction": "👍"
  }
}
```

> Если пользователь поставил несколько реакций на одно сообщение, параметр `reaction` обязателен для указания конкретной.

**Ответ:**
```json
{
  "type": "reaction.remove.success",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid",
    "reaction": "👍"
  }
}
```

### Получить реакции сообщения

**Запрос:**
```json
{
  "type": "message.reactions",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "message.reactions.success",
  "data": {
    "messageId": "message-uuid",
    "reactions": [
      {
        "reaction": "👍",
        "count": 3,
        "emails": ["alice@gmail.com", "bob@gmail.com", "charlie@gmail.com"]
      },
      {
        "reaction": "❤️",
        "count": 1,
        "emails": ["alice@gmail.com"]
      }
    ]
  }
}
```

---

## Сервер-сервер

### Аутентификация серверов

Server-to-server запросы требуют подписи. Каждый сервер имеет keypair.

**Заголовки запроса:**
```
X-Server-Signature: base64-signature
X-Server-Timestamp: 1234567890
X-Server-Nonce: random-uuid
```

**Правила:**
- Подпись = `HMAC-SHA256(serverPrivateKey, requestBody + timestamp + nonce)`
- Timestamp должен быть в пределах ±5 минут от текущего времени
- Nonce должен быть уникальным (сервер хранит использованные nonce в течение 10 минут)

### Проверка пользователя

**Запрос от сервера Б к серверу А:**
```json
{
  "type": "server.user_check",
  "data": {
    "email": "alice@gmail.com",
    "requestingServer": "server-b.com"
  }
}
```

**Ответ:**
```json
{
  "type": "server.user_check.success",
  "data": {
    "exists": true,
    "publicKeys": ["base64-key-1", "base64-key-2"]
  }
}
```

### Challenge для верификации

Защита от replay-атак через timestamp и nonce.

**Запрос:**
```json
{
  "type": "server.challenge",
  "data": {
    "email": "alice@gmail.com",
    "challenge": "random-string-to-sign",
    "timestamp": 1234567890,
    "nonce": "uuid-v4"
  }
}
```

**Ответ (подписанный клиентом):**
```json
{
  "type": "server.challenge.response",
  "data": {
    "email": "alice@gmail.com",
    "challenge": "random-string-to-sign",
    "signature": "base64-signature",
    "timestamp": 1234567890,
    "nonce": "uuid-v4"
  }
}
```

> Сервер проверяет: timestamp в пределах ±5 минут, nonce не использовался ранее.

---

## Звонки (WebRTC)

Сервер используется только для сигнализации. Медиа-трафик идёт напрямую между клиентами (P2P).

### Инициировать звонок

**Запрос:**
```json
{
  "type": "call.start",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "callType": "audio" | "video",
    "targetEmails": ["bob@gmail.com"]
  }
}
```

**Ответ:**
```json
{
  "type": "call.start.success",
  "data": {
    "callId": "call-uuid"
  }
}
```

### Входящий звонок (server push)

**От сервера:**
```json
{
  "type": "call.incoming",
  "data": {
    "callId": "call-uuid",
    "chatId": "chat-uuid",
    "callerEmail": "alice@gmail.com",
    "callType": "audio" | "video"
  }
}
```

### Ответ на звонок

**Запрос:**
```json
{
  "type": "call.answer",
  "connectionId": "connection-uuid",
  "data": {
    "callId": "call-uuid",
    "accept": true | false
  }
}
```

**Ответ:**
```json
{
  "type": "call.answer.success",
  "data": {
    "callId": "call-uuid",
    "accepted": true
  }
}
```

### WebRTC сигнализация

**SDP Offer:**
```json
{
  "type": "call.sdp_offer",
  "connectionId": "connection-uuid",
  "data": {
    "callId": "call-uuid",
    "targetEmail": "bob@gmail.com",
    "sdp": "base64-encoded-sdp"
  }
}
```

**SDP Answer:**
```json
{
  "type": "call.sdp_answer",
  "connectionId": "connection-uuid",
  "data": {
    "callId": "call-uuid",
    "targetEmail": "alice@gmail.com",
    "sdp": "base64-encoded-sdp"
  }
}
```

**ICE Candidate:**
```json
{
  "type": "call.ice_candidate",
  "connectionId": "connection-uuid",
  "data": {
    "callId": "call-uuid",
    "targetEmail": "bob@gmail.com",
    "candidate": "base64-encoded-ice-candidate"
  }
}
```

### Завершить звонок

**Запрос:**
```json
{
  "type": "call.end",
  "connectionId": "connection-uuid",
  "data": {
    "callId": "call-uuid"
  }
}
```

**Server push:**
```json
{
  "type": "call.ended",
  "data": {
    "callId": "call-uuid",
    "reason": "hangup" | "rejected" | "timeout" | "error"
  }
}
```

---

## Server push уведомления

### Пользователь присоединился к чату
```json
{
  "type": "user.joined",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com",
    "role": "member"
  }
}
```

### Пользователь вышел из чата
```json
{
  "type": "user.left",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com"
  }
}
```

### Пользователь исключён из чата
```json
{
  "type": "user.removed",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com"
  }
}
```

### Изменение статуса пользователя
```json
{
  "type": "user.status.changed",
  "data": {
    "email": "bob@gmail.com",
    "status": "online" | "offline" | "away",
    "chatIds": ["chat-uuid-1", "chat-uuid-2"]
  }
}
```

### Уведомление о реакции
```json
{
  "type": "reaction.notification",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid",
    "email": "bob@gmail.com",
    "reaction": "👍",
    "action": "add" | "remove"
  }
}
```

### Уведомление о статусе сообщения
```json
{
  "type": "message.status.notification",
  "data": {
    "messageId": "message-uuid",
    "chatId": "chat-uuid",
    "email": "bob@gmail.com",
    "status": "delivered" | "read"
  }
}
```

---

## Ошибки

Все ошибки имеют формат:

```json
{
  "type": "error",
  "data": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

### Коды ошибок

- `AUTH_REQUIRED` — требуется аутентификация
- `INVALID_EMAIL` — неверный email
- `INVALID_CODE` — неверный код подтверждения
- `CODE_EXPIRED` — код подтверждения истёк
- `CHAT_NOT_FOUND` — чат не найден
- `CHAT_FULL` — чат заполнен
- `PERMISSION_DENIED` — недостаточно прав
- `RATE_LIMIT` — превышен лимит запросов
- `INVALID_MESSAGE` — неверный формат сообщения
- `CONTENT_TYPE_NOT_ALLOWED` — тип контента не разрешён
- `CALL_NOT_FOUND` — звонок не найден
- `CALL_BUSY` — пользователь занят
- `CALL_TIMEOUT` — нет ответа
- `UNSUPPORTED_FORMAT` — формат не поддерживается (например, MessagePack)
- `INVITE_DENIED` — нет прав на приглашение
- `USER_ALREADY_IN_CHAT` — пользователь уже в чате
- `NOT_ALLOW_JOIN` — присоединение к чату запрещено
- `USER_HIDDEN` — пользователь скрыт
- `CHAT_HIDDEN` — чат скрыт
- `REGISTRATION_CLOSED` — регистрация в чат закрыта
- `MESSAGE_NOT_FOUND` — сообщение не найдено
- `CONNECTION_NOT_FOUND` — подключение не найдено
- `TIMESTAMP_OUT_OF_RANGE` — timestamp вне допустимого диапазона
- `NONCE_REUSED` — nonce уже использовался
