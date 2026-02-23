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

fn write_to_language_file(
  language_code: &str,
  translation: &str,
  translation_key: &str,
  path_to_locales_folder: &str,
) {
  let file_path = Path::new(path_to_locales_folder).join(format!("{}.json", language_code));
  let mut file_content: Value = if file_path.exists() {
    let content = fs::read_to_string(&file_path).unwrap();
    serde_json::from_str(&content).unwrap()
  } else {
    serde_json::json!({})
  };

  file_content[translation_key] = serde_json::json!(translation);
  fs::write(
    file_path,
    serde_json::to_string_pretty(&file_content).unwrap(),
  )
  .unwrap();
}

#[tauri::command]
fn write_to_language_files(
  json_data: &str,
  translation_key: &str,
  path_to_locales_folder: &str,
  default_language: &str,
  original_string_before_localization: &str,
  should_update_default_language: bool,
) -> String {
  let mut translations: Vec<Translation> = serde_json::from_str(json_data).unwrap();

  // Remove the default language from the translations if it exists
  if !should_update_default_language {
    translations.retain(|translation| translation.language_code != default_language);
  }

  for translation_obj in &translations {
    write_to_language_file(
      &translation_obj.language_code,
      &translation_obj.translation,
      translation_key,
      path_to_locales_folder,
    );
  }

  // TODO: I'm a monster I know. This is all kinds of confusing
  if should_update_default_language {
    write_to_language_file(
      default_language,
      original_string_before_localization,
      translation_key,
      path_to_locales_folder,
    );
    if default_language == "en-US" {
      write_to_language_file(
        "en-GB",
        original_string_before_localization,
        translation_key,
        path_to_locales_folder,
      );
    }
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
