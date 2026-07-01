use crate::{ApiClientState, stremio::api::ApiError};
use tauri::{AppHandle, State};

pub mod auth;

use auth::AuthState;

#[tauri::command]
pub async fn get_has_auth_key_and_check_valid(
    api_client_state: State<'_, ApiClientState>,
    auth_state: State<'_, AuthState>,
) -> Result<bool, ApiError> {
    match auth_state.get_key() {
        Some(auth_key) => api_client_state.check_if_authkey_valid(&auth_key).await,
        None => Ok(false),
    }
}

// remember to call `.manage(MyState::default())`
#[tauri::command]
pub async fn login_and_populate(
    api_client_state: State<'_, ApiClientState>,
    auth_state: State<'_, AuthState>,
    app: AppHandle,
    email: &str,
    password: &str,
) -> Result<bool, ApiError> {
    auth_state.set_key_and_populate_store(
        app,
        &api_client_state
            .get_authkey_from_creds(email, password)
            .await?,
    );

    Ok(true)
}
