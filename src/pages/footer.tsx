import { useContext } from 'react';
import { Avatar, Box, Stack, Typography, Link } from '@mui/material';
import {
  FaFacebookSquare as FacebookLogo,
  FaTwitter as TwitterLogo,
  FaInstagram as InstagramLogo,
} from 'react-icons/fa';
import { LocaleContext } from '../components/providers/localeProvider';

const Footer = () => {
  const { translation } = useContext(LocaleContext);
  const f = translation.footer;

  const textLinks = [
    {
      title: f.features,
      bodyText: [
        {
          text: f.linkGitHub,
          path: 'https://github.com/proga-react-practice/kappa-team-project',
        },
      ],
    },
    {
      title: f.resources,
      bodyText: [
        {
          text: f.mui,
          path: '/coomingsoon',
        },
        {
          text: f.developers,
          path: '/coomingsoon',
        },
        {
          text: f.support,
          path: '/coomingsoon',
        },
      ],
    },
    {
      title: f.company,
      bodyText: [
        {
          text: f.about,
          path: '/coomingsoon',
        },
        {
          text: f.ourTeam,
          path: '/coomingsoon',
        },
        {
          text: f.contact,
          path: '/coomingsoon',
        },
        {
          text: f.feedback,
          path: '/feedback',
        },
      ],
    },
  ];

  const iconLinks = [
    { IconComponent: FacebookLogo, href: 'https://www.facebook.com/' },
    { IconComponent: TwitterLogo, href: 'https://twitter.com/' },
    { IconComponent: InstagramLogo, href: 'https://www.instagram.com/' }
  ];

  return (
    <Stack sx={{
      flexDirection: { xs: 'column', md: 'row' },
      justifyContent: 'space-around',
      py: 6,
      px: 5,
      textAlign: { xs: 'center', md: 'left' },
      padding: 10
    }}>
      <Box>
        <Typography variant="h6">CollecTion</Typography>
      </Box>

      <Box sx={{
        display: { md: 'flex' },
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}>
        {textLinks.map((item, index) => (
          <Box key={index} sx={{ margin: { xs: '20px 0', md: '0 20px' } }}>
            <Typography variant="subtitle1" gutterBottom>
              {item.title}
            </Typography>
            {item.bodyText.map((link, linkIndex) => (
              <Typography key={linkIndex} variant="body2" >
                <Link href={link.path} color="inherit" underline="none">
                  {link.text}
                </Link>
              </Typography>
            ))}
          </Box>
        ))}
      </Box>

      <Stack sx={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: { xs: 3, md: '5px' },
      }}>
        {iconLinks.map((item, index) => (
          <Link key={index} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Avatar
              component={item.IconComponent}
              sx={{ mx: 1, '&:hover': { fill: "gray" } }}
            />
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default Footer;
