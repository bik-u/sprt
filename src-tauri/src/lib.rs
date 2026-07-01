use stremio::api::ApiClientState;
use tauri::Manager;
use tauri_plugin_store::StoreExt;

pub mod sprt;
pub mod sprt_plugins;
pub mod stremio;

use sprt::auth::AuthState;
use sprt::{get_has_auth_key_and_check_valid, login_and_populate};

const STORE_PATH: &str = "strpstore.json";

#[tauri::command]
fn show_window(window: tauri::WebviewWindow) {
    window.show().unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let store = app.store(STORE_PATH);
            let auth_state = AuthState::init();
            auth_state.populate_key_from_store(app.handle().clone());
            app.manage(auth_state);
            // Reqwest client
            app.manage(ApiClientState::init());

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            show_window,
            get_has_auth_key_and_check_valid,
            login_and_populate
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
