<p align="center">
  <a href="https://github.com/kadaradam/notion-pr-link/actions"><img alt="typescript-action status" src="https://github.com/kadaradam/notion-pr-link/workflows/build-test/badge.svg"></a>
</p>

# Update your Notion task with GitHub PR url

Paste your notion task url to your GitHub Pull Request body, and this action will automatically update your Notion task's property with the PR url.

## Inputs

| input           | description                    | required | default |
| --------------- | ------------------------------ | -------- | ------- |
| `notion_secret` | Notion Secret API Key          | `true`   | `none`  |
| `notion_prop`   | Notion page property to update | `true`   | `PR`    |

## Configure

1. [Generate Notion secret](https://developers.notion.com/docs/getting-started) (See step 1.)
2. Navigate to your Notion board, click on your task and add a new URL property. (Example property name: `PR`) <p><img src="./assets/notion_prop_setup.png?raw=true" alt="Notion Add a property" title="Notion Add a property" width="500" /></p>
3. Add these 2 values to the GitHub action

## Usage

```yml
name: Add PR to Notion
on:
  pull_request:
    types: [opened]
jobs:
  notion:
    runs-on: ubuntu-latest
    steps:
      - name: Update notion page
        uses: kadaradam/notion-pr-link@latest
        with:
          notion_secret: 'secret_1234567890abcdef1234'
          notion_prop: 'PR'
```
