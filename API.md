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

### Handshake

**Запрос:**
```json
{
  "type": "handshake",
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
  "data": {
    "format": "json" | "msgpack",
    "version": "1.0"
  }
}
```

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
      "maxParticipants": 1000,
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
        "join": true,
        "participants": 10
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
      "avatar": "base64-encoded-image",
      "status": "online" | "offline" | "away"
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
    "avatar": "base64-encoded-image",
    "status": "online",
    "visible": true
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
    "avatar": "base64-encoded-image",
    "status": "online",
    "visible": true
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
        "join": true,
        "participants": 10,
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
    "join": true,
    "settings": {
      "maxParticipants": 100,
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
    "join": true,
    "settings": {
      "maxParticipants": 100,
      "messageSize": 4096,
      "historyLimit": 1000,
      "allowedContentTypes": ["text", "media", "poll"]
    },
    "participants": [
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

### Проверка участника в чате

**Запрос:**
```json
{
  "type": "chat.check_user",
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
  "type": "chat.check_user.success",
  "data": {
    "exists": true,
    "role": "member"
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
    "join": false,
    "settings": {
      "maxParticipants": 200,
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

**Ответ:**
```json
{
  "type": "chat.check_user.success",
  "data": {
    "exists": true,
    "role": "member"
  }
}
```

### Обновить настройки чата

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
    "join": false,
    "settings": {
      "maxParticipants": 200,
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
    "type": "public" | "protected",
    "settings": { ... },
    "participants": [
      {
        "email": "alice@gmail.com",
        "connections": 2,
        "role": "owner" | "moderator" | "member" | "observer"
      }
    ]
  }
}
```

---

## История

### Получение истории

**Запрос:**
```json
{
  "type": "history.get",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "from": "message-uuid-or-timestamp",
    "limit": 50
  }
}
```

**Ответ:**
```json
{
  "type": "history.get.success",
  "data": {
    "messages": [ ... ],
    "hasMore": true
  }
}
```

---

## Участники

### Список участников

**Запрос:**
```json
{
  "type": "participants.list",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid"
  }
}
```

**Ответ:**
```json
{
  "type": "participants.list.success",
  "data": {
    "participants": [
      {
        "email": "alice@gmail.com",
        "nickname": "alice",
        "firstName": "Alice",
        "lastName": "Smith",
        "avatar": "base64-encoded-image",
        "status": "online",
        "connections": [
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
  "type": "participants.set_role",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "targetEmail": "bob@gmail.com",
    "role": "moderator"
  }
}
```

### Приглашение в чат

**Правила:**
- Публичный чат: любой участник может пригласить
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
  "type": "chat.invited",
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

### Исключение из чата (только владелец/модератор)

**Запрос:**
```json
{
  "type": "chat.kick",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "email": "bob@gmail.com"
  }
}
```

---

## Оценки

### Поставить оценку

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

### Удалить оценку

**Запрос:**
```json
{
  "type": "reaction.remove",
  "connectionId": "connection-uuid",
  "data": {
    "chatId": "chat-uuid",
    "messageId": "message-uuid"
  }
}
```

---

## Сервер-сервер

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

**Запрос:**
```json
{
  "type": "server.challenge",
  "data": {
    "email": "alice@gmail.com",
    "challenge": "random-string-to-sign"
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
    "signature": "base64-signature"
  }
}
```

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
- `JOIN_CLOSED` — присоединение к чату закрыто
- `USER_HIDDEN` — пользователь скрыт
- `CHAT_HIDDEN` — чат скрыт
- `REGISTRATION_CLOSED` — регистрация в чат закрыта
- `ALREADY_IN_CHAT` — пользователь уже в чате
- `INVITE_PERMISSION_DENIED` — нет прав на приглашение
