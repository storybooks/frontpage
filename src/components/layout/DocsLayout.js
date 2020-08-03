import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  Button,
  Highlight,
  Icon,
  Input,
  Link,
  Subheading,
  ShadowBoxCTA,
  StyledButton,
  TableOfContents,
  TooltipNote,
  WithTooltip,
  global,
  styles,
} from '@storybook/design-system';
import { graphql, Link as GatsbyLink } from 'gatsby';

import { SocialGraph } from '../basics';

const { breakpoint, color, pageMargins, typography } = styles;
const { GlobalStyle } = global;

const bottomSpacing = css`
  padding-bottom: 3rem;
`;

const Sidebar = styled.div`
  position: sticky;
  padding-top: 10px;
  padding-right: 20px;
  margin-right: 56px;
  margin-top: -10px;
  top: 0;
  max-height: calc(100vh);
  width: 276px;
  min-width: 276px;
  overflow: scroll;
  ${bottomSpacing}

  @media (max-width: ${breakpoint * 1.333 - 1}px) {
    flex: none;
    margin: 1rem 0 2rem;
    width: 100%;
    border-bottom: 1px solid ${color.mediumlight};
  }
`;

const SidebarControls = styled.div`
  display: flex;
`;

const Content = styled.div`
  ${bottomSpacing}
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: -10px;
  margin-right: -10px;
`;

const Wrapper = styled.div`
  ${pageMargins}

  && {
    padding-bottom: 0;
  }

  @media (min-width: ${breakpoint * 1.333}px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
    display: flex;
  }
`;

const StyledTableOfContents = styled(TableOfContents)`
  margin-top: 32px;
`;

const ExpandCollapseButton = styled(StyledButton).attrs({ appearance: 'outline' })`
  padding: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 10px;

  svg {
    width: 10px;
    height: 10px;
    margin: 0;

    &:last-of-type {
      margin-top: -2px;
    }
  }
`;

const NextSubheading = styled(Subheading)`
  color: ${color.mediumdark};
  display: block;
  margin-bottom: 17px;
`;

const NextNavigation = styled.div`
  margin-top: 48px;
`;

const GithubLinkWrapper = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const GithubLinkItem = styled(Link)`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s2}px;
`;

const LinkWrapper = ({ href, ...props }) => {
  return <GatsbyLink to={href} {...props} />;
};

function DocsLayout({ children, data, pageContext, ...props }) {
  const {
    currentPage: {
      fields: { slug },
    },
  } = data;

  const { docsToc, tocItem, nextTocItem } = pageContext;
  const addLinkWrappers = (items) =>
    items.map((item) => ({
      ...item,
      ...(item.type.match(/link/) && { LinkWrapper }),
      ...(item.children && { children: addLinkWrappers(item.children) }),
    }));
  const docsTocWithLinkWrappers = addLinkWrappers(docsToc);
  const withTooltipProps = {
    placement: 'top',
    trigger: 'hover',
    hasChrome: false,
    as: ExpandCollapseButton,
  };

  return (
    <>
      <GlobalStyle />
      <SocialGraph
        title="Storybook: UI component explorer for frontend developers"
        desc="Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient."
        // url={home}
        // image={ogImage}
      />
      <Wrapper>
        <Sidebar>
          <StyledTableOfContents currentPath={slug} items={docsTocWithLinkWrappers}>
            {({ menu, allTopLevelMenusAreOpen, toggleAllOpen, toggleAllClosed }) => (
              <>
                <SidebarControls>
                  <Input
                    id="Pill"
                    label="Search"
                    hideLabel
                    icon="search"
                    appearance="pill"
                    placeholder="Search docs"
                  />
                  {allTopLevelMenusAreOpen ? (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Collapse all" />}
                      onClick={toggleAllClosed}
                    >
                      <>
                        <Icon icon="arrowdown" />
                        <Icon icon="arrowup" />
                      </>
                    </WithTooltip>
                  ) : (
                    <WithTooltip
                      {...withTooltipProps}
                      tooltip={<TooltipNote note="Expand all" />}
                      onClick={toggleAllOpen}
                    >
                      <>
                        <Icon icon="arrowup" />
                        <Icon icon="arrowdown" />
                      </>
                    </WithTooltip>
                  )}
                </SidebarControls>
                {menu}
              </>
            )}
          </StyledTableOfContents>
        </Sidebar>

        <Content>
          {children}
          {nextTocItem && (
            <NextNavigation>
              <NextSubheading>Next</NextSubheading>
              <ShadowBoxCTA
                action={
                  <Button
                    appearance="secondary"
                    href={nextTocItem.path}
                    ButtonWrapper={LinkWrapper}
                  >
                    Continue
                  </Button>
                }
                headingText={nextTocItem.title}
                messageText={nextTocItem.description}
              />
            </NextNavigation>
          )}

          <GithubLinkWrapper>
            <GithubLinkItem tertiary href={tocItem.githubUrl} target="_blank" rel="noopener">
              <span role="img" aria-label="write">
                ✍️
              </span>{' '}
              Edit on GitHub – PRs welcome!
            </GithubLinkItem>
          </GithubLinkWrapper>
        </Content>
      </Wrapper>
    </>
  );
}

export default DocsLayout;

export const query = graphql`
  fragment DocsLayoutCurrentPageQuery on MarkdownRemark {
    fields {
      slug
    }
  }
`;