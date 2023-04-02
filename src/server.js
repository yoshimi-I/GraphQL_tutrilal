const { ApolloServer, gql} = require("apollo-server");
const fs = require("fs");
const { dirname } = require("path");
const path = require("path");


// 1つ1つの投稿の情報を記載
let links = [
  {
    id:"link-0",
    description: "いろいろ学ぶ",
    url: "www.test.test",
  },
]


//スキーマの定義
// あくまで定義のみを行いデータの操作はリゾルバで行う

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "test",
    feed: () => links,
    },

  Mutation: {
    post: (parent,args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    }
  }
  };



const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname,"schema.graphql"),"utf-8"),
  resolvers,
});

server.listen().then(({url}) => console.log(`${url}でサーバーを立ち上げております`));
