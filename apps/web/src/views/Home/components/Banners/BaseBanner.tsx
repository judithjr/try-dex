import { useTranslation } from '@pancakeswap/localization'
import { Flex, Link, OpenNewIcon, Text, useMatchBreakpoints, Button, Svg, SvgProps } from '@pancakeswap/uikit'
import { ASSET_CDN } from 'config/constants/endpoints'
import Image from 'next/legacy/image'
import { memo } from 'react'
import { styled } from 'styled-components'
import * as S from './Styled'
import { baseBunny, baseBgMobile, baseTree, baseBg, baseMoon } from './images'
import { flyingAnim } from './animations'

const pancakeSwapLogo = `${ASSET_CDN}/web/banners/ethXpancakeswap.png`

const OpBnbLogo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" fill="none" {...props}>
    <circle cx="16.5" cy="16.5" r="16.5" fill="black" />
    <path
      d="M10.6397 8.89271L16.5571 5.5L22.4745 8.89271L20.2542 10.0854L16.5571 7.97563L12.7639 10.0854L10.6397 8.89271ZM22.3835 13.1073L20.2542 11.9146L16.5571 14.0244L12.7639 11.9146L10.6346 13.1073V15.5829L14.3368 17.6927V22.0025L16.466 23.2854L18.5953 22.0025V17.7879L22.2975 15.6781V13.1123H22.3835V13.1073ZM22.3835 19.8927V17.4171L20.2542 18.7V21.0804L22.3835 19.8927ZM23.9564 20.7146L20.2593 22.8244V25.3L26.1817 21.9073V15.1269L23.9614 16.5L23.9564 20.7146ZM21.8271 11.0025L23.9564 12.2854V14.761L26.0856 13.4781V11.0025L23.9564 9.71959L21.8271 11.0025ZM14.3368 23.7415V26.2171L16.466 27.5L18.5953 26.2171V23.7415L16.466 25.0244L14.3368 23.7415ZM10.6346 19.8927L12.7639 21.0854V18.6098L10.6346 17.3269V19.8927ZM14.3368 11.0025L16.466 12.2854L18.6863 11.0025L16.5571 9.71959L14.3368 11.0025ZM9.06676 12.2854L11.287 11.0025L9.06676 9.71959L6.9375 11.0025V13.4781L9.06676 14.761V12.2854ZM9.06676 16.5L6.9375 15.2171V21.9975L12.86 25.3902V22.9146L9.15779 20.8048V16.495L9.06676 16.5Z"
      fill="#F0B90B"
    />
  </Svg>
)

const RightWrapper = styled.div`
  position: absolute;
  min-height: 100%;
  width: 100%;
  right: 0;
  bottom: -2px;
  z-index: 2;
  > span:first-child {
    position: absolute !important;
    right: -10px;
    bottom: 0px;
    z-index: 2;
    ${({ theme }) => theme.mediaQueries.lg} {
      right: 180px;
      top: auto;
      bottom: 1px;
    }
  }
  > span:nth-child(2) {
    position: absolute !important;
    top: -20px;
    right: 90px;
    z-index: 3;
    animation: ${flyingAnim} 3.5s ease-in-out infinite;
  }
`

const BgWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: -2px;
  overflow: hidden;
  height: 100%;
  border-radius: 32px;
  z-index: 1;
  > span:first-child {
    position: relative !important;
    right: 0px;
    top: 1px;
    height: 100% !important;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    bottom: auto;
    height: 100%;
    right: 0px;
    top: -1px;
    border-bottom-left-radius: 0px;
    > span:first-child {
      position: relative !important;
      right: 0px;
      top: 0px;
    }
  }
  > span:nth-child(2) {
    position: absolute !important;
    bottom: -2px;
    right: 0px;
    z-index: 3;
  }
`
const Header = styled.div`
  padding-right: 100px;
  position: relative;
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 98%;
  letter-spacing: 0.01em;
  color: #000000;
  margin-top: 18px;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0px;
    margin-bottom: 10px;
  }
`
const SubTitle = styled.div`
  color: #FF720D;
  font-feature-settings: 'liga' off;
  font-family: Kanit;
  font-size: 19.847px;
  font-style: normal;
  font-weight: 700;
  line-height: 98%; /* 19.45px */
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 10px;
  }
`

const Divider = styled.div`
  height: 15px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

const BaseBanner = () => {
  const { t } = useTranslation()
  const { isMobile, isDesktop } = useMatchBreakpoints()

  return (
    <S.Wrapper
      style={{
        background: `linear-gradient(180deg, #0052FF 0%, #FFF 100%)`,
        overflow: isMobile ? 'hidden' : 'visible',
      }}
    >
      <S.Inner>
        <S.LeftWrapper position="relative" style={{ zIndex: 3, justifyContent: isMobile ? 'flex-start' : 'center' }}>
        <Flex alignItems="center" mb={isMobile ? '0' : '0.5rem'} style={{ gap: isMobile ? 8 : 10 }}>
          <span style={{ color: 'white' }}>PattieSwap</span>

            <Divider />
            <OpBnbLogo width={33} height={33} />
          </Flex>
          <Header>{isMobile ? t('Base is LIVE!') : t('PattiePad Is Live')}</Header>
          {!isMobile && <SubTitle>{t('Launch Your Project Tokens on Pattie Launchpad')}</SubTitle>}
          <Link
            style={{ textDecoration: 'none' }}
            external
            href="https://pattiepad.com"
          >
            <Button variant="text" pl="0px" pt="0px" scale={isMobile ? 'sm' : 'md'}>
              <Text textTransform={isMobile ? 'uppercase' : 'capitalize'} bold fontSize="16px" color="#000000">
                {t('Get Started')}
              </Text>
              <OpenNewIcon color="#000000" />
            </Button>
          </Link>
        </S.LeftWrapper>
        <RightWrapper>
          {isDesktop ? (
            <>
              <Image src={baseBunny} alt="baseBunny" width={218} height={203} placeholder="blur" />
              <Image src={baseMoon} alt="baseMoon" width={123} height={94} placeholder="blur" />
            </>
          ) : (
            <Image src={baseBunny} alt="baseBunny" width={196} height={182} placeholder="blur" />
          )}
          <BgWrapper>
            {isDesktop ? (
              <>
                <Image src={baseBg} alt="baseBg" width={624} height={192} placeholder="blur" />
                <Image src={baseTree} alt="baseTree" width={149} height={150} placeholder="blur" />
              </>
            ) : (
              <Image src={baseBgMobile} alt="baseBgMobile" width={316} height={176} placeholder="blur" />
            )}
          </BgWrapper>
        </RightWrapper>
      </S.Inner>
    </S.Wrapper>
  )
}

export default memo(BaseBanner)
