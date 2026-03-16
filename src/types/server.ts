/**
 * @fileoverview Типы данных сервера
 * @module types/server
 */

import type { ContentType } from './message.js'

/**
 * Возможности сервера
 * - msgpack: поддержка формата MessagePack
 * - webrtc: поддержка WebRTC звонков
 * @typedef {'msgpack' | 'webrtc'} ServerFeature
 */
export type ServerFeature = 'msgpack' | 'webrtc'

/**
 * Лимиты сервера
 * @interface ServerLimits
 */
export interface ServerLimits {
  /** Максимальное количество пользователей на сервере */
  maxUsers: number
  /** Максимальный размер сообщения (байт) */
  maxMessageSize: number
  /** Лимит запросов в секунду */
  rateLimit: number
}

/**
 * Настройки сервера
 * @interface ServerSettings
 */
export interface ServerSettings {
  /** Открыта ли регистрация */
  registrationOpen: boolean
  /** Доверенные серверы (URL) */
  trustedServers: string[]
  /** Белый список email доменов */
  emailWhitelist: string[]
  /** Чёрный список email доменов */
  emailBlacklist: string[]
  /** Белый список IP */
  ipWhitelist: string[]
  /** Чёрный список IP */
  ipBlacklist: string[]
  /** Требуется верификация email */
  emailVerificationRequired: boolean
  /** Открыто ли создание чатов для всех */
  chatCreationOpen: boolean
  /** Разрешены ли публичные чаты */
  allowPublicChats: boolean
  /** Разрешены ли защищённые чаты */
  allowProtectedChats: boolean
  /** Максимум пользователей в чате */
  maxUsersPerChat: number
  /** Максимальный размер сообщения (байт) */
  maxMessageSize: number
  /** Лимит истории */
  historyLimit: number
  /** Разрешённые типы контента */
  allowedContentTypes: ContentType[]
}

/**
 * Информация о сервере
 * @interface ServerInfo
 */
export interface ServerInfo {
  /** URL сервера */
  url: string
  /** Название сервера */
  name: string
  /** Описание */
  description?: string
  /** Иконка (base64) */
  icon?: string
  /** Версия протокола */
  version: string
  /** Поддерживаемые возможности */
  features: ServerFeature[]
  /** Лимиты сервера */
  limits: ServerLimits
}
