use std::default;

use crate::stremio::api::MAIN_API_URL;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub enum Resources {
    #[default]
    NotProvided,
    Catalog,
    Meta,
    Stream,
    Subtitles,
    AddonCatalog,
    // Advanced resources not supported
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub enum Types {
    #[default]
    NotProvided,
    Movie,
    Series,
    Channel,
    TV,
    // Advanced types not supported
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct AddonCatalog {
    #[serde(rename = "type")]
    pub _type: Types,
    pub id: String,
    pub name: String,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Extra {
    pub name: String,
    pub is_required: bool,
    pub options: Option<Vec<String>>,
    pub options_limit: u32,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Catalog {
    #[serde(rename = "type")]
    pub _type: String,
    pub id: String,
    pub name: String,
    pub extra: Option<Vec<Extra>>,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct Manifest {
    pub name: String,
    pub description: String,
    pub types: Vec<Types>,
    pub resources: Vec<Resources>,
    pub id_prefixes: Option<Vec<String>>,
    pub catalogs: Vec<Catalog>,
    pub addon_catalogs: Option<Vec<AddonCatalog>>,
    // User config not supported (just put in server side)
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct Flags {
    pub official: bool,
    pub protected: bool,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]

pub struct Addon {
    pub manifest: Manifest,
    pub transport_url: String,
    pub transport_name: String,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct AddonCollection {
    pub last_modified: String,
    pub addons: Vec<Addon>,
}

pub async fn get_addon_collection(api_client: Client) {}

pub async fn get_user(api_client: Client, auth_key: String) {}
