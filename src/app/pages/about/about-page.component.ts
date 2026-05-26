import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-about-page",
  templateUrl: "./about-page.component.html",
  styleUrl: "./about-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutPage {
  public facts = [
    "21 years old",
    "Based in Belgium",
    "I like cooking and gardening",
    "I drink my coffee black",
    "I speak Dutch, English, French, and basic German"
  ];


  public tools = [
    { name: "Visual Studio Code - IDE", link: "https://code.visualstudio.com/" },
    { name: "Obsidian - Notetaking", link: "https://obsidian.md/" },
    { name: "Restic - Back-ups", link: "https://restic.readthedocs.io/en/stable/" },
    { name: "Syncthing - File syncing", link: "https://syncthing.net/" },
    { name: "Brave - Web Browser", link: "https://brave.com/" },
    { name: "Todoist - Todo Lists", link: "https://www.todoist.com/" },
    { name: "Zsh - Shell", link: "https://ohmyz.sh/" },
    { name: "Tailscale - Remote Connection", link: "https://tailscale.com/" },
    { name: "Bitwarden - Password Manager", link: "https://bitwarden.com/" },
    { name: "Thunderbird - Email Client", link: "https://www.thunderbird.net/" }
  ];
}

