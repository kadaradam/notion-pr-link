import * as core from '@actions/core';
import * as github from '@actions/github';
import { Client } from '@notionhq/client';
import { getNotionIdsFromText } from './utils';

async function run(): Promise<void> {
  try {
    const notionPropToUpdate: string = core.getInput('notion_prop');
    const notionSecret: string = core.getInput('notion_secret');
    const githubPrPayload = github?.context?.payload?.pull_request;

    core.debug(`Github event payload: ${JSON.stringify(github?.context)}`);

    if (!githubPrPayload) {
      core.setFailed('Unable to resolve GitHub Pull Request payload.');
      return;
    }

    const { body: githubPrBody, html_url: githubPrUrl } = githubPrPayload;

    if (!githubPrBody) {
      core.setFailed('Unable to get GitHub Pull Request body.');
      return;
    }

    if (!githubPrUrl) {
      core.setFailed('Unable to get GitHub Pull Request URL.');
      return;
    }

    const extractedPageIds = getNotionIdsFromText(githubPrBody);

    if (!extractedPageIds?.length) {
      core.info('No Notion tasks were found in your GitHub Pull Request.');
      return;
    }

    core.debug(
      `Extracted Notion page ids: ${JSON.stringify(extractedPageIds)}`
    );

    if (notionSecret === 'test') {
      core.info('This is a test. Skipping Notion API call.');
      return;
    }

    const notion = new Client({ auth: notionSecret });
    const updateNotionPageTasks = extractedPageIds.map(async pageId =>
      notion.pages.update({
        page_id: pageId,
        properties: {
          [notionPropToUpdate]: {
            url: githubPrUrl
          }
        }
      })
    );

    await Promise.all(updateNotionPageTasks);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
