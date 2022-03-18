import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { BdsButton, BdsIcon, BdsTypo } from 'blip-ds/dist/blip-ds-react';

import { SetGlobalTrackings } from '.';
import { setSettings, Settings } from '../../Settings';
import {
  Input,
  Switch,
  Block,
  Title,
  Paragraph,
  Flex,
  HorizontalStack,
  Stack,
} from '@components';

const EmptyGlboalTrackings = (): JSX.Element => {
  return (
    <Block
      borderRadius="5px"
      borderColor="rgba(0, 0, 0, 0.2)"
      borderStyle="dashed"
      borderWidth="1px"
    >
      <Stack padding={2}>
        <BdsIcon size="xxx-large" theme="outline" name="warning" />
        <Block marginTop={1}>
          <Title>Ainda não há trackings</Title>
        </Block>
        <Paragraph>Você ainda não adicionou nenhuma tracking</Paragraph>
      </Stack>
    </Block>
  );
};

export const GlobalTrackingsForm = (): JSX.Element => {
  const [globalExtras, setGlobalExtras] = React.useState(
    Settings.lastGlobalTrackings
  );
  const [error, setError] = React.useState([]);
  const [shouldDeleteCurrentExtras, setShouldDeleteCurrentExtras] =
    React.useState(true);

  /**
   * Set the html tamplate for each global extra
   *
   */
  const getGlobalTrackingLine = (): JSX.Element => {
    return (
      <div>
        {globalExtras.length === 0 && <EmptyGlboalTrackings />}

        {globalExtras.map((field, index) => {
          return (
            <div className="w-100 flex justify-between mb2" key={uuid()}>
              <Input
                value={field.key}
                onChange={(e) => (field.key = e.target.value)}
                onSubmit={handleSubmit}
                errorMessage={error[index]}
                label="Key"
                type="text"
              />

              <div className="ml2">
                <Input
                  value={field.value}
                  onChange={(e) => (field.value = e.target.value)}
                  onSubmit={handleSubmit}
                  errorMessage={error[index]}
                  label="Value"
                  type="text"
                />
              </div>

              <i
                className="self-center icon-close lh-solid cursor-pointer ml2"
                onClick={() => removeLine(index)}
              ></i>
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * add a new line in the globalExtra list
   *
   */
  const addNewLine = (): void => {
    setGlobalExtras([...globalExtras, { key: '', value: '' }]);
  };

  /**
   * remove a line in the globalExtra list
   *
   * @param index The index of globalExtra list
   */
  const removeLine = (index: number): void => {
    setGlobalExtras(globalExtras.filter((_, i) => i !== index));
  };

  /**
   * Get the empties global extras in the list
   *
   * @param globalExtras The trackings that will be setted
   */
  const getEmptyExtras = (globalExtras: any): any[] => {
    return globalExtras.filter(
      (currentExtra) => currentExtra.key === '' || currentExtra.value === ''
    );
  };

  /**
   * Check for empty values in globalExtras list
   *
   * @param globalExtras The trackings that will be setted
   */
  const hasKeyOrValueEmpty = (globalExtras: any): boolean => {
    const emptyExtras = getEmptyExtras(globalExtras);
    const hasKeyOrValueEmpty = emptyExtras.length > 0;

    return hasKeyOrValueEmpty;
  };

  /**
   * Transform a list with key and value element in a object {key: value}
   *
   * @param previousExtra previous value in globalExtras array
   * @param currentExtra current value in globalExtras array
   */
  const listToObject = (previousExtra: any, currentExtra: any): any => {
    return { ...previousExtra, [currentExtra.key]: currentExtra.value };
  };

  /**
   * Set an error message in the empty lines
   *
   * @param globalExtras The trackings that will be setted
   */
  const setErrorFields = (globalExtras: any): string[] => {
    const errorMessage = 'Preencha todos os campos';
    const emptyExtrasIndexs = globalExtras.map((extra, index) => {
      if (extra.key === '' || extra.value === '') {
        return index;
      }
    });

    const arrayOfErrors = new Array(globalExtras.length);
    emptyExtrasIndexs.forEach((extraIndex) => {
      arrayOfErrors[extraIndex] = errorMessage;
    });

    return arrayOfErrors;
  };

  /**
   * Check the globalExtras and call the SetGlobalTrackings method, to set the global actions
   *
   */
  const handleSubmit = (): void => {
    if (hasKeyOrValueEmpty(globalExtras)) {
      const arrayOfErrors = setErrorFields(globalExtras);
      setError(arrayOfErrors);
      return;
    }

    const globalSettingsWillBeSetted = globalExtras.reduce(
      (previousExtra, currentExtra) =>
        listToObject(previousExtra, currentExtra),
      {}
    );

    setSettings({ lastGlobalTrackings: globalExtras });

    new SetGlobalTrackings().handle(
      globalSettingsWillBeSetted,
      shouldDeleteCurrentExtras
    );

    setError(new Array(globalExtras.length));
  };

  /**
   * Call the SetGlobalTrackings method, to remove all the global actions
   *
   */
  const onRemove = (): void => {
    new SetGlobalTrackings().handle({}, true);
  };

  return (
    <Block marginTop={2}>
      <Title>Adicionar trackings globais</Title>

      <Paragraph>
        Todos os blocos que contem a ação de tracking terá adição de trackings
        globais.
        <br />
        <b>Você ainda precisa publicar o fluxo</b>
      </Paragraph>

      <Block marginTop={2}>
        {getGlobalTrackingLine()}

        <Flex marginTop={2}>
          <Switch
            isChecked={shouldDeleteCurrentExtras}
            name="overwrite"
            onChange={(e) => setShouldDeleteCurrentExtras(e.target.checked)}
          />

          <Block marginLeft={2}>
            <BdsTypo bold="extra-bold" variant="fs-14">
              Apagar trackings globais definidas
            </BdsTypo>
          </Block>
        </Flex>

        <HorizontalStack marginTop={2}>
          <BdsButton variant="dashed" onClick={addNewLine}>
            Add Tracking
          </BdsButton>

          <BdsButton type="submit" variant="primary" onClick={handleSubmit}>
            Definir
          </BdsButton>

          <BdsButton variant="delete" onClick={onRemove}>
            Remover*
          </BdsButton>
        </HorizontalStack>

        <Paragraph>
          * Remove as trackings globais de <b>TODAS</b> as actions.
        </Paragraph>
      </Block>
    </Block>
  );
};
