use serde_json::value::Value;

const MAIN_API: &str = "https://api.strem.io/api/";

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

pub struct ApiResponse {
    pub result: Result<Value, String>,
}

fn match_status_code_to_error() {}

pub async fn get_addon_collection() {}
