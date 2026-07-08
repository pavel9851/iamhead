terraform {
  required_version = ">= 1.6.0"

  required_providers {
    yandex = {
      source  = "yandex-cloud/yandex"
      version = "~> 0.136"
    }
  }
}

variable "container_name" {
  type        = string
  description = "Yandex Cloud Serverless Container name."
}

variable "image_url" {
  type        = string
  description = "Yandex Container Registry image URL, for example cr.yandex/<registry_id>/iamhead:latest."
}

variable "service_account_id" {
  type        = string
  description = "Service account used by the container."
}

variable "database_url" {
  type        = string
  sensitive   = true
  description = "PostgreSQL connection string."
}

variable "auth_secret" {
  type        = string
  sensitive   = true
  description = "Auth.js secret."
}

variable "auth_url" {
  type        = string
  description = "Public application URL, for example https://iamhead.ru."
}

variable "email_server" {
  type        = string
  sensitive   = true
  description = "SMTP connection string for magic-link emails."
  default     = ""
}

variable "email_from" {
  type        = string
  description = "Sender address for magic-link emails."
  default     = "noreply@iamhead.ru"
}

resource "yandex_serverless_container" "iamhead" {
  name               = var.container_name
  description        = "iamhead.ru Next.js app"
  cores              = 1
  memory             = 512
  core_fraction      = 100
  execution_timeout  = "15s"
  service_account_id = var.service_account_id

  image {
    url = var.image_url

    environment = {
      NODE_ENV    = "production"
      DATABASE_URL = var.database_url
      AUTH_SECRET  = var.auth_secret
      AUTH_URL     = var.auth_url
      EMAIL_SERVER = var.email_server
      EMAIL_FROM   = var.email_from
    }
  }
}
