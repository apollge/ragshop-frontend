import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";
import Head from "next/head";

const SingleItemSyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (error) return <ErrorMessage error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for: {this.props.id}</p>;

          const item = data.item;
          return (
            <SingleItemSyles>
              <Head>
                <title>RAG Shop! | {item.title}</title>
              </Head>
              <img
                src={item.largeImage || `//via.placeholder.com/420`}
                alt={item.title}
              />
              <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemSyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
