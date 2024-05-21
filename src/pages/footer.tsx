import React from 'react';
import { Avatar, Box,  Stack, Typography, Link } from '@mui/material';
import {
  FaFacebookSquare as FacebookLogo,
  FaTwitter as TwitterLogo,
  FaInstagram as InstagramLogo,
} from 'react-icons/fa';

const textLinks = [
  {
    title: 'Features',
    bodyText: [
      {
        text: 'Link GitHub',
        path: 'https://github.com/proga-react-practice/kappa-team-project',
      },

    ],
  },
  {
    title: 'Resources',
    bodyText: [
      {
        text: 'MUI',
        path: '',
      },
      {
        text: 'Developers',
        path: '',
      },
      {
        text: 'Support',
        path: '',
      },
    ],
  },
  {
    title: 'Company',
    bodyText: [
      {
        text: 'About',
        path: '',
      },
      {
        text: 'Our Team',
        path: '',
      },

      {
        text: 'Contact',
        path: '',
      },
      {
        text: 'Feedback',
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


const Footer = () => {
  return (
    <Stack sx={{
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-around',
                py: 6,
                px: 5,
                textAlign: { xs: 'center', md: 'left' },
                padding:10
              }}>
      <Box>
        <Typography variant="h6" >CollecTion</Typography>
      </Box>

      <Box sx={{
              display: { md: 'flex' },
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
        {textLinks.map((item, index) => (
          <Box key={index} sx={{ margin: { xs: '20px 0', md: '0 20px' } }}>
            <Typography variant="subtitle1"  gutterBottom>
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
