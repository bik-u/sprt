use serde_json::json;
use std::sync::Arc;
use std::sync::RwLock;
use tauri::Manager;
use tauri::{EventLoopMessage, Wry};
use tauri_plugin_store::Store;
use tauri_plugin_store::StoreExt;

#[derive(Default)]
pub struct AuthStateInner {
    pub auth_key: Option<String>,
}

pub struct AuthState(pub RwLock<AuthStateInner>);

impl AuthState {
    pub fn populate_key_from_store(&self, app: tauri::AppHandle) {
        let mut inner = self.0.write().unwrap();
        let store = app.store(crate::STORE_PATH).unwrap();
        inner.auth_key = store.get("auth_key").and_then(|v| Some(v.to_string()));
    }

    pub fn get_has_key(&self) -> bool {
        let inner = self.0.read().unwrap();
        inner.auth_key.is_some()
    }

    pub fn get_key(&self) -> Option<String> {
        let inner = self.0.read().unwrap();
        inner.auth_key.clone()
    }

    pub fn init() -> Self {
        Self(RwLock::new(AuthStateInner::default()))
    }
}

#[tauri::command]
pub async fn get_has_auth_key_and_check_if_valid(
    app_handle: tauri::AppHandle,
) -> Result<bool, String> {
    let auth_state = app_handle.state::<AuthState>();
    match auth_state.get_key() {
        Some(v) => {}
        () => {}
    }

    Ok(false)
}
