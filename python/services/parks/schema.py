import graphene
from graphene_federation import build_schema, key
from services.parks.repository import ParkRepository

@key(fields = "permalink")
class ParkType(graphene.ObjectType):
    name = graphene.String()
    permalink = graphene.String()

class Query(graphene.ObjectType):
    test_field = graphene.String()
    parks = graphene.List(ParkType)

    def resolve_test_field(root, info):
        return "Hello, World!"

    # This is not the right way to do this.
    # Ideally we have a data loader class that the resolver calls?
    def resolve_parks(root, info):
        return ParkRepository().parks


schema = build_schema(query=Query)
