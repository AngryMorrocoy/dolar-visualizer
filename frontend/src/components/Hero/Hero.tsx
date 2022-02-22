import { Stack, Typography, Link } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { DolarHistoryAPIResult } from '../../services/DolarApi/types';
import { getDolarHistory } from '../../services/DolarApi/util';
import { prettyDate } from '../../services/Date/index';
import Twitter from '@mui/icons-material/Twitter';

const Hero: FunctionComponent<any> = (): JSX.Element => {
  const [currentPrice, setCurrentPrice] = useState<
    DolarHistoryAPIResult | undefined
  >(undefined);

  useEffect(() => {
    const getLastUpdate = async () => {
      const dolarResult = await getDolarHistory({ page_size: 1 });
      setCurrentPrice(dolarResult[0]);
    };

    getLastUpdate();
  }, []);

  return (
    <Stack alignItems="center" spacing={1} mt={4} mb={4}>
      {currentPrice && (
        <>
          <Typography variant="h3">💵 {`${currentPrice.price}Bs`}</Typography>
          <Link
            href={currentPrice.tweet_url}
            target="_blank"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="caption">
              Última actualización: ({prettyDate(currentPrice.date)})
            </Typography>
            <Twitter
              sx={{
                color: '#0A6FAE',
                ml: 1,
              }}
            />
          </Link>
        </>
      )}
    </Stack>
  );
};

export default Hero;
