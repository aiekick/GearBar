import * as vscode from 'vscode';

interface ItemConfig {
  setting: string;
  label: string;
  icon: string;
  tooltip: string;
}

export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.text = "$(gear)";
  statusBarItem.tooltip = "Click to toggle features";
  statusBarItem.command = "gearbar.showMenu";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  const disposable = vscode.commands.registerCommand("gearbar.showMenu", async () => {
    const itemsConfig: ItemConfig[] = loadItemsConfig();
    if (!itemsConfig || itemsConfig.length === 0) {
      vscode.window.showErrorMessage("No configuration items found in settings. Please configure 'gearbar.items' in your user/workspace settings.");
      return;
    }

    const config = vscode.workspace.getConfiguration();
    const quickPickItems: vscode.QuickPickItem[] = itemsConfig.map(item => {
      const currentValue = config.get<boolean>(item.setting, false);
      return {
        label: `${item.icon} ${item.label}`,
        description: currentValue ? "$(check)" : "",
        detail: item.tooltip
      };
    });

    const selection = await vscode.window.showQuickPick(quickPickItems, {
      placeHolder: "Select a feature to toggle"
    });

    if (selection) {
      const selectedItem = itemsConfig.find(item => `${item.icon} ${item.label}` === selection.label);
      if (selectedItem) {
        const currentValue = config.get<boolean>(selectedItem.setting, false);
        await config.update(selectedItem.setting, !currentValue, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`${selectedItem.label} is now ${!currentValue ? 'enabled' : 'disabled'}.`);
      }
    }
  });

  context.subscriptions.push(disposable);
}

function loadItemsConfig(): ItemConfig[] {
  const config = vscode.workspace.getConfiguration();
  const items = config.get<ItemConfig[]>("gearbar.items", []);
  return items;
}

export function deactivate() {}
