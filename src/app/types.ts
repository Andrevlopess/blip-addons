import { BaseFeature } from '@features/BaseFeature';
import { BaseCommand } from '@commands/BaseCommand';

export type Message<Type = unknown> = {
  data: Type;
};

export type BlipsRequest = {
  identifier: string;
  isBlipsRequest: boolean;
  commandCode: string;
  args: any[];
};

export type BlipsResponse = {
  isBlipsResponse: boolean;
  identifier: string;
  result: unknown;
};

export type Command = {
  new (): BaseCommand;
} & typeof BaseCommand;

export type Feature = {
  new (): BaseFeature;
} & typeof BaseFeature;

export type FeatureRequest = {
  code: string;
  type: 'run' | 'cleanup';
  isFeatureRequest: boolean;
  args: any[];
};

export type BlipsCopy = {
  isCopyFromBlips: boolean;
  blocksCode: string;
  originBot: string;
};

export type SettingsUpdate = {
  isSettingsUpdate: true;
  newSettings: Record<string, any>;
  isFromClient: boolean;
};

export type Handshake = {
  isHandshake: boolean;
};

export type Snippet = {
  label: string;
  kind: any;
  documentation: string;
  insertText: string;
};

export type ConditionViewModel = {
  comparison: string;
  source: string;
  values: any[];
  variable: string;
}

export type Tag = {
  name: string;
  color: string;
}

export type ConditionActionProblemDetail = {
  blockName: string;
  actionName?: string;
  variable: string;
}
