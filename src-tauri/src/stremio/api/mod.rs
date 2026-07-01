use reqwest::{Client, Error};

use crate::stremio::api::api_types::{AddonCollectionResult, LoginResult};

pub mod api_types;

pub const MAIN_API_URL: &str = "https://api.strem.io/api/";

pub struct ApiClientState(Client);

impl ApiClientState {
    pub fn init() -> Self {
        Self(Client::new())
    }
}

#[derive(thiserror::Error, Debug)]
pub enum ApiError {
    #[error("stremio server error: {0}")]
    StremioServerError(#[from] reqwest::Error),
    #[error("serde json error: {0}")]
    SerdeJsonError(#[from] serde_json::Error),
}

#[derive(serde::Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
pub enum ApiErrorKind {
    StremioServerError(String),
    SerdeJsonError(String),
}

impl serde::Serialize for ApiError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = self.to_string();
        let error_kind = match self {
            Self::StremioServerError(_) => ApiErrorKind::StremioServerError(error_message),
            Self::SerdeJsonError(_) => ApiErrorKind::SerdeJsonError(error_message),
        };
        error_kind.serialize(serializer)
    }
}

impl ApiClientState {
    pub async fn get_authkey_from_creds(
        &self,
        email: &str,
        password: &str,
    ) -> Result<String, ApiError> {
        let res = self
            .0
            .post(format!("{MAIN_API_URL}login"))
            .json(&api_types::LoginBody {
                email: email.to_string(),
                password: password.to_string(),
                facebook: false,
                _type: "Login".to_string(),
            })
            .send()
            .await?
            .json::<LoginResult>()
            .await?;

        Ok(res.result.auth_key)
    }

    pub async fn check_if_authkey_valid(&self, auth_key: &str) -> Result<bool, ApiError> {
        let res = self
            .0
            .post(format!("{MAIN_API_URL}addonCollectionGet"))
            .json(&api_types::AuthkeyBody {
                auth_key: auth_key.to_string(),
                _type: "AddonCollectionGet".to_string(),
                update: true,
            })
            .send()
            .await?
            .json::<AddonCollectionResult>()
            .await?;

        Ok(true)
    }
}
