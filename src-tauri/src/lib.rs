use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::fs;
use std::path::Path;

// Define a struct to represent the JSON object
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Translation {
    language_code: String,
    translation: String,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn write_to_language_files(json_data: &str, translation_key: &str, path: &str) -> String {
    let translations: Vec<Translation> = serde_json::from_str(json_data).unwrap();
    for translation_obj in translations {
        let file_path = Path::new(path).join(format!("{}.json", translation_obj.language_code));
        let mut file_content: Value = if file_path.exists() {
            let content = fs::read_to_string(&file_path).unwrap();
            serde_json::from_str(&content).unwrap()
        } else {
            serde_json::json!({})
        };

        file_content[translation_key] = serde_json::json!(translation_obj.translation);
        fs::write(
            file_path,
            serde_json::to_string_pretty(&file_content).unwrap(),
        )
        .unwrap();
    }
    "Translations processed successfully".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, write_to_language_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
