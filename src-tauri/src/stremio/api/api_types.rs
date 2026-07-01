use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Default, Clone)]
#[serde(rename_all = "snake_case")]
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

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(untagged)]
pub enum ResourceEntry {
    Simple(Resources),
    Detailed {
        name: Resources,
        #[serde(default)]
        types: Vec<Types>,
        #[serde(default)]
        id_prefixes: Vec<String>,
    },
}

#[derive(Debug, Deserialize, Serialize, Default, Clone, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum Types {
    #[default]
    NotProvided,
    Movie,
    Series,
    Channel,
    #[serde(alias = "tv")]
    TV,
    All,
    #[serde(untagged)]
    Other(String), // catches anything not explicitly listed above
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
    pub resources: Vec<ResourceEntry>,
    pub id_prefixes: Option<Vec<String>>,
    pub catalogs: Vec<Catalog>,
    pub addon_catalogs: Vec<AddonCatalog>,
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

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct AddonCollectionResult {
    pub result: AddonCollection,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct AddonUser {
    #[serde(rename = "_id")]
    pub id: String,
    pub email: String,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct LoginBody {
    pub email: String,
    pub facebook: bool,
    pub password: String,
    #[serde(rename = "type")]
    pub _type: String,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct LoginResponseError {
    pub message: String,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LoginResponseBody {
    pub auth_key: String,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LoginResult {
    pub result: LoginResponseBody,
}

#[derive(Debug, Deserialize, Serialize, Default)]
#[serde(rename_all = "camelCase", default)]
pub struct AuthkeyBody {
    pub auth_key: String,
    #[serde(rename = "type")]
    pub _type: String,
    pub update: bool,
}
