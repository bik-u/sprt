use std::error::Error;

pub struct AuthState {
    auth_key: Option<String>,
}

impl AuthState {
    async fn check_authenticated() -> bool {
        true
    }
}

#[tauri::command]
async fn has_auth() -> Result<bool, Box<dyn Error + 'static>> {
    Ok(true)
}
