use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct AddonUser {
    #[serde(rename = "_id")]
    pub id: String,
    pub email: String,
}
