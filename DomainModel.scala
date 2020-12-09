trait Base {
  name: String
  permalink: String
}

case class Park(
  attractions: Option[List[Attraction]],
  restaurants: Option[List[Restaurant]]
) extends Base

case class Attraction() extends Base

case class Restaurant(
  categoryCode: String,
  url: String,
  menus: Option[List[String]],
  openedOn: Option[LocalDateTime]
) extends Base
