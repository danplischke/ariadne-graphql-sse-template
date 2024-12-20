import asyncio
from typing import Any, AsyncGenerator
from ariadne import SubscriptionType, make_executable_schema, gql
from ariadne.asgi import GraphQL
from ariadne.contrib.sse import GraphQLHTTPSSEHandler

type_defs = gql("""

    type Query {
        _empty: String
    }

    type Subscription { 
        counter: Int!
    }

""")

subscription = SubscriptionType()


@subscription.field("counter")
async def counter_resolver(count, info) -> AsyncGenerator[int, None]:
    return count


@subscription.source("counter")
async def counter_generator(obj: Any, info: Any) -> AsyncGenerator[int, None]:
    for i in range(5):
        yield i
        await asyncio.sleep(1)


schema = make_executable_schema(type_defs, [subscription])
app = GraphQL(schema, http_handler=GraphQLHTTPSSEHandler(), debug=True)
