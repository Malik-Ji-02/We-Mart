import { useNavigate } from "react-router-dom"
import { Icon } from "../icons/Icon"
import { getCategories } from "../data/categories"

export function CategoriesScreen() {
  const navigate = useNavigate()
  const categories = getCategories()

  return (
    <section className="category-list">
      {categories.map(([name, image]) => (
        <button
          key={name}
          onClick={() => navigate(`/search?category=${encodeURIComponent(name)}`)}
          aria-label={`Browse ${name}`}
        >
          <img src={image} alt={name} loading="lazy" />
          <span>
            <strong>{name}</strong>
            <small>
              {name === "Fruits" || name === "Vegetables"
                ? "Fresh stock from nearby sellers"
                : "Popular picks from local shops"}
            </small>
          </span>
          <Icon name="chevron" />
        </button>
      ))}
    </section>
  )
}

export default CategoriesScreen
