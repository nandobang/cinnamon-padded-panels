const Settings = imports.ui.settings;
const Main = imports.ui.main;
const Panel = imports.ui.panel;

const log = global.log;

class MyExt {
  constructor(meta) {
    log('Padded Panels - init');
    this._meta = meta;
  }

  enable() {
    log('Padded Panels - enabled');

    this._settings = new Settings.ExtensionSettings(this, this._meta.uuid);

    Main.getPanels().forEach((panel) =>  {
      log('Patching panel ', panel.panelPosition);
      panel.actor.add_style_class_name('padded');
      panel._leftBox.add_style_class_name('padded');
      panel._centerBox.add_style_class_name('padded');
      panel._rightBox.add_style_class_name('padded');
    });
  }

  disable() {
    log('Padded Panels - disabled');

    Main.getPanels().forEach((panel) =>  {
      panel.actor.remove_style_class_name('padded');
      panel._leftBox.remove_style_class_name('padded');
      panel._centerBox.remove_style_class_name('padded');
      panel._rightBox.remove_style_class_name('padded');
    });

    this._settings.finalize();
    this._settings = null;
  }
}

let ext = null;

function init(metadata) {
  ext = new MyExt(metadata);
}

function enable() {
  try {
    ext.enable();
  } catch (err) {
  }
}

function disable() {
  try {
    ext.disable();
  } catch (err) {
  }
}
