import React from 'react';
import { useStyles } from '../../utils/hooks';
import { faker } from '@faker-js/faker';
import { lowerCase, upperFirst } from 'lodash';
import { ClearValueButton, CopyToClipboardButton } from '../Buttons';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
};

export const LoremIpsum = () => {
  const { classes } = useStyles();
  const [output, setOutput] = React.useState('');
  const [multiplier, setMultiplier] = React.useState(1);

  const generate = (type: string) => {
    let outputs = [];
    switch (type) {
      default:
      case 'line':
        outputs = faker.lorem.lines(multiplier).split('\n');
        break;
      case 'paragraph':
        outputs = faker.lorem.paragraphs(multiplier, '\n').split('\n');
        break;
      case 'slug':
        outputs = faker.lorem.slug(multiplier).split('\n');
        break;
      case 'word':
        outputs = faker.lorem.words(multiplier).split('\n');
        break;
      case 'hack':
        outputs = [...Array(multiplier)].map(faker.hacker.phrase);
        break;
      case 'hex':
        outputs = [...Array(multiplier)].map(() =>
          faker.string.hexadecimal({
            length: randomInt(1, 50),
            casing: 'lower',
          }),
        );
        break;
      case 'datetime':
        outputs = [...Array(multiplier)].map(faker.date.anytime);
        break;
      case 'number':
        outputs = [...Array(multiplier)].map(() =>
          faker.number.int({ min: 1, max: 100000000000000000 }),
        );
        break;
      case 'string':
        outputs = [...Array(multiplier)].map(() =>
          faker.string.sample(randomInt(10, 100)),
        );
        break;
      case 'uuid':
        outputs = [...Array(multiplier)].map(faker.string.uuid);
        break;
      case 'ipv4':
        outputs = [...Array(multiplier)].map(faker.internet.ipv4);
        break;
      case 'ipv6':
        outputs = [...Array(multiplier)].map(faker.internet.ipv6);
        break;
      case 'mac':
        outputs = [...Array(multiplier)].map(faker.internet.mac);
        break;
      case 'domain':
        outputs = [...Array(multiplier)].map(faker.internet.domainName);
        break;
      case 'password':
        outputs = [...Array(multiplier)].map(() =>
          faker.internet.password({
            length: randomInt(10, 100),
            memorable: false,
          }),
        );
        break;
      case 'url':
        outputs = [...Array(multiplier)].map(faker.internet.url);
        break;
      case 'user-agent':
        outputs = [...Array(multiplier)].map(faker.internet.userAgent);
        break;
      case 'imei':
        outputs = [...Array(multiplier)].map(faker.phone.imei);
        break;
      case 'cron':
        outputs = [...Array(multiplier)].map(faker.system.cron);
        break;
      case 'emoji':
        outputs = [...Array(multiplier)].map(faker.internet.emoji);
        break;
      case 'address':
        outputs = [...Array(multiplier)].map(
          () =>
            `${faker.location.streetAddress(
              true,
            )}, ${faker.location.zipCode()} ${faker.location.city()}, ${faker.location.country()}`,
        );
        break;
      case 'product-name':
        outputs = [...Array(multiplier)].map(faker.commerce.productName);
        break;
      case 'product-description':
        outputs = [...Array(multiplier)].map(faker.commerce.productDescription);
        break;
      case 'catch-phrase':
        outputs = [...Array(multiplier)].map(faker.company.catchPhrase);
        break;
      case 'bic':
        outputs = [...Array(multiplier)].map(faker.finance.bic);
        break;
      case 'credit-card':
        outputs = [...Array(multiplier)].map(faker.finance.creditCardNumber);
        break;
      case 'iban':
        outputs = [...Array(multiplier)].map(() =>
          faker.finance.iban({ formatted: true }),
        );
        break;
      case 'song':
        outputs = [...Array(multiplier)].map(faker.music.songName);
        break;
      case 'name':
        outputs = [...Array(multiplier)].map(faker.person.fullName);
        break;
      case 'job-title':
        outputs = [...Array(multiplier)].map(faker.person.jobTitle);
        break;
    }
    setOutput(outputs.join('\n'));
  };

  const GenerateButton = (props: { type: string; title?: string }) => {
    return (
      <Button
        size="small"
        variant="outlined"
        onClick={() => generate(props.type)}
        color="inherit"
        sx={{
          px: '16px',
          borderColor: 'textVerySubtle',
          borderRadius: '4px !important',
        }}
      >
        {props.title ? props.title : upperFirst(lowerCase(props.type))}
      </Button>
    );
  };

  return (
    <>
      <FormControl className={classes.fullWidth}>
        <Grid container style={{ marginBottom: '5px' }}>
          <Grid item>
            <InputLabel id="multiplier-label">Count</InputLabel>
            <Box sx={{ ml: '16px ' }}>
              <Select
                style={{ minWidth: '100px' }}
                labelId="multiplier-label"
                value={multiplier.toString(10)}
                onChange={e =>
                  setMultiplier(Number.parseInt(e.target.value as string, 10))
                }
                variant="standard"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={250}>250</MenuItem>
                <MenuItem value={500}>500</MenuItem>
                <MenuItem value={1000}>1000</MenuItem>
              </Select>
              <ButtonGroup className={classes.editorButtonGroup}>
                <ClearValueButton setValue={setOutput} tooltip="Clear output" />
                <CopyToClipboardButton output={output} />
              </ButtonGroup>
            </Box>
            <ButtonGroup className={classes.editorButtonGroup}>
              <GenerateButton type="line" />
              <GenerateButton type="paragraph" />
              <GenerateButton type="slug" />
              <GenerateButton type="word" />
              <GenerateButton type="hack" />
            </ButtonGroup>
            <ButtonGroup className={classes.editorButtonGroup}>
              <GenerateButton type="hex" />
              <GenerateButton type="datetime" />
              <GenerateButton type="number" />
              <GenerateButton type="string" />
              <GenerateButton type="uuid" />
            </ButtonGroup>
            <ButtonGroup className={classes.editorButtonGroup}>
              <GenerateButton type="ipv4" title="IPv4" />
              <GenerateButton type="ipv6" title="IPv6" />
              <GenerateButton type="mac" title="MAC" />
              <GenerateButton type="imei" />
              <GenerateButton type="cron" />
            </ButtonGroup>
            <ButtonGroup className={classes.editorButtonGroup}>
              <GenerateButton type="domain" />
              <GenerateButton type="password" />
              <GenerateButton type="url" title="URL" />
              <GenerateButton type="user-agent" title="User agent" />
              <GenerateButton type="emoji" />
            </ButtonGroup>
            <ButtonGroup className={classes.editorButtonGroup}>
              <GenerateButton type="address" />
              <GenerateButton type="name" title="Name" />
              <GenerateButton type="job-title" title="Job title" />
            </ButtonGroup>
            <ButtonGroup className={classes.editorButtonGroup}>
              <GenerateButton type="product-name" title="Product name" />
              <GenerateButton
                type="product-description"
                title="Product description"
              />
              <GenerateButton type="catch-phrase" title="Catch phrase" />
              <GenerateButton type="song" title="Song name" />
            </ButtonGroup>
            <ButtonGroup className={classes.editorButtonGroup}>
              <GenerateButton type="bic" title="BIC" />
              <GenerateButton type="credit-card" title="Credit card" />
              <GenerateButton type="iban" title="IBAN" />
            </ButtonGroup>
          </Grid>
          <Grid item className={classes.fullWidth}>
            <TextField
              id="output"
              label="Output"
              value={output || ''}
              className={classes.fullWidth}
              multiline
              minRows={20}
              maxRows={50}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};

export default LoremIpsum;
