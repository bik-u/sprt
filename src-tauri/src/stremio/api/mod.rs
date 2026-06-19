use reqwest::Client;

pub mod addon;
pub mod user;

const MAIN_API_URL: &str = "https://api.strem.io/api/";

pub struct ApiClientState(Client);

impl ApiClientState {
    pub fn init() -> Self {
        Self(Client::new())
    }
}

#[derive(thiserror::Error, Debug)]
pub enum ApiError {
    #[error["failed to authorize"]]
    Unauthorized(String),
}

#[derive(serde::Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
pub enum ApiErrorKind {
    Unauthorized(String),
}

impl serde::Serialize for ApiError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = self.to_string();
        let error_kind = match self {
            Self::Unauthorized(_) => ApiErrorKind::Unauthorized(error_message),
        };
        error_kind.serialize(serializer)
    }
}

#[derive(serde::Serialize)]
pub struct AuthenticationData {}
