import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";

const pages = {
  about: {
    title: "Про нас",
    lead: "House Staff помогает быстро подобрать мебель для спокойного, удобного дома.",
    items: [
      "Подбираем базовые предметы, которые легко сочетать между собой.",
      "Держим фокус на практичности, понятной цене и аккуратных материалах.",
      "Обновляем каталог небольшими партиями, чтобы в нем не было лишнего шума.",
    ],
    sections: [
      {
        title: "Как мы выбираем мебель",
        text: "Мы смотрим на форму, надежность и то, как предмет ведет себя в реальной комнате. В каталог попадают вещи, которые не спорят с интерьером и остаются удобными каждый день.",
      },
      {
        title: "Для каких домов",
        text: "Наш ассортимент подходит для квартир, небольших студий, семейных гостиных и рабочих уголков. Мы собираем позиции так, чтобы стул, стол, лампа и кресло могли работать вместе.",
      },
      {
        title: "Что важно в сервисе",
        text: "Покупателю должно быть легко сравнить товары, быстро собрать корзину и понять итоговую стоимость. Поэтому интерфейс остается простым, а карточки товаров показывают только главное.",
      },
    ],
  },
  contacts: {
    title: "Контакты",
    lead: "Напишите нам или приезжайте в шоурум, если хотите увидеть мебель вживую.",
    items: [
      "Телефон: +38 (044) 000-00-00",
      "Email: hello@housestaff.store",
      "Адрес: Киев, ул. Домашняя, 12",
    ],
    sections: [
      {
        title: "График работы",
        text: "Шоурум открыт с понедельника по субботу с 10:00 до 19:00. В воскресенье мы отвечаем на сообщения и помогаем оформить заказ онлайн.",
      },
      {
        title: "Самовывоз и доставка",
        text: "Небольшие товары можно забрать самостоятельно. Для мебели крупнее мы согласуем удобное время доставки и заранее уточняем детали подъезда.",
      },
      {
        title: "Консультация",
        text: "Если вы сомневаетесь между несколькими позициями, отправьте размеры комнаты и фото места. Мы подскажем, что лучше подойдет по масштабу и цвету.",
      },
    ],
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      activePage: "catalog",
      items: [
        {
          id: 1,
          title: "Стул серый",
          img: "chair-grey.jpeg",
          desc: "Лаконичный стул для кухни или рабочего места.",
          category: "chairs",
          price: "50.00",
        },
        {
          id: 2,
          title: "Стол",
          img: "table.jpeg",
          desc: "Прочный стол для обеденной зоны и встреч.",
          category: "tables",
          price: "150.00",
        },
        {
          id: 3,
          title: "Диван",
          img: "sofa.jpeg",
          desc: "Мягкий диван для гостиной с глубоким сидением.",
          category: "sofa",
          price: "550.00",
        },
        {
          id: 4,
          title: "Лампа",
          img: "light.jpeg",
          desc: "Настольный свет для чтения и вечернего уюта.",
          category: "light",
          price: "25.00",
        },
        {
          id: 5,
          title: "Кресло подвесное",
          img: "armchair.jpeg",
          desc: "Акцентное кресло для балкона, террасы или зоны отдыха.",
          category: "armchairs",
          price: "100.00",
        },
        {
          id: 6,
          title: "Стул белый",
          img: "chair-white.jpeg",
          desc: "Светлый стул с простой формой для современного интерьера.",
          category: "chairs",
          price: "50.00",
        },
      ],
      ShowFullItem: false,
      fullItem: {},
      notification: {
        visible: false,
        message: "",
        type: "success",
      },
    };
    this.state.currentItems = this.state.items;
    this.addtoOrder = this.addtoOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.notification.visible && (
          <div className={`notification ${this.state.notification.type}`}>
            {this.state.notification.message}
          </div>
        )}
        <Header
          activePage={this.state.activePage}
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          onNavigate={this.setPage}
        />

        {this.renderPage()}

        {this.state.ShowFullItem && (
          <ShowFullItem item={this.state.fullItem} onAdd={this.addtoOrder} onShowItem={this.onShowItem} />
        )}
        <Footer />
      </div>
    );
  }

  renderPage() {
    if (this.state.activePage === "catalog") {
      return (
        <div className="main-content">
          <Categories chooseCategory={this.chooseCategory} />
          <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addtoOrder} />
        </div>
      );
    }

    if (this.state.activePage === "account") {
      return this.renderAccountPage();
    }

    return this.renderInfoPage(pages[this.state.activePage]);
  }

  renderInfoPage(page) {
    return (
      <section className="info-page">
        <div className="info-hero">
          <span className="page-label">House Staff</span>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
        </div>
        <ul className="info-list">
          {page.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="page-sections">
          {page.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  renderAccountPage() {
    const total = this.state.orders.reduce((sum, item) => sum + Number.parseFloat(item.price), 0);

    return (
      <section className="info-page account-page">
        <div className="info-hero">
          <span className="page-label">Ваш кабинет</span>
          <h1>Кабинет</h1>
          <p>Здесь сохраняются товары из корзины и считается общая цена выбранной мебели.</p>
        </div>
        <div className="account-summary">
          <span>Сохранено товаров</span>
          <strong>{this.state.orders.length}</strong>
          <span>Общая цена</span>
          <strong>{new Intl.NumberFormat().format(total)}$</strong>
        </div>

        <div className="saved-products">
          {this.state.orders.length > 0 ? (
            this.state.orders.map((item) => (
              <article className="saved-product" key={item.id}>
                <img src={"./img/" + item.img} alt={item.title} />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                  <b>{item.price}$</b>
                </div>
                <button onClick={() => this.deleteOrder(item.id)}>Удалить</button>
              </article>
            ))
          ) : (
            <div className="empty-account">
              <h2>Сохраненных товаров пока нет</h2>
              <p>Добавьте товары в корзину, и они появятся здесь вместе с итоговой суммой.</p>
              <button onClick={() => this.setPage("catalog")}>Перейти в каталог</button>
            </div>
          )}
        </div>

      </section>
    );
  }

  onShowItem(item) {
    this.setState({ fullItem: item });
    this.setState({ ShowFullItem: !this.state.ShowFullItem });
  }

  chooseCategory(category) {
    this.setState({ activePage: "catalog" });

    if (category === "all") {
      this.setState({ currentItems: this.state.items });
      return;
    }

    this.setState({
      currentItems: this.state.items.filter((el) => el.category === category),
    });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) }, () => {
      this.setState({ notification: { visible: true, message: "Товар удален!", type: "error" } });
      setTimeout(() => this.setState({ notification: { visible: false, message: "", type: "error" } }), 2000);
    });
  }

  addtoOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) {
        isInArray = true;
      }
    });
    if (!isInArray) {
      this.setState({ orders: [...this.state.orders, item] }, () => {
        this.setState({ notification: { visible: true, message: "Товар добавлен в корзину!", type: "success" } });
        setTimeout(() => this.setState({ notification: { visible: false, message: "", type: "success" } }), 2000);
      });
    }
  }

  setPage(page) {
    this.setState({ activePage: page, ShowFullItem: false });
  }
}

export default App;
