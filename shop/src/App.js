import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: "Стул серый",
          img: "chair-grey.jpeg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "chairs",
          price: "50.00",
        },
        {
          id: 2,
          title: "Стол",
          img: "table.jpeg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "tables",
          price: "150.00",
        },
        {
          id: 3,
          title: "Диван",
          img: "sofa.jpeg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "sofa",
          price: "550.00",
        },
        {
          id: 4,
          title: "Лампа",
          img: "light.jpeg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "light",
          price: "25.00",
        },
        {
          id: 5,
          title: "Кресло подвесное",
          img: "armchair.jpeg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "armchairs",
          price: "100.00",
        },
        {
          id: 6,
          title: "Стул белый",
          img: "chair-white.jpeg",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
          category: "chairs",
          price: "50.00",
        },
      ],
      ShowFullItem: false,
      fullItem: {}
      ,
      notification: {
        visible: false,
        message: '',
        type: 'success'
      }
    };
    this.state.currentItems = this.state.items
    this.addtoOrder = this.addtoOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        {this.state.notification.visible && (
          <div className={`notification ${this.state.notification.type}`}>
            {this.state.notification.message}
          </div>
        )}
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        {/* content area holds categories and items for responsive layout */}
        <div className="main-content">
          <Categories chooseCategory={this.chooseCategory} />
          <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addtoOrder} />
        </div>

        {this.state.ShowFullItem && <ShowFullItem item={this.state.fullItem} onAdd={this.addtoOrder} onShowItem={this.onShowItem} />}
        <Footer />
      </div>
    );
  }

  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({ShowFullItem: !this.state.ShowFullItem})
  }

  chooseCategory(category) { 
    if(category === 'all') {
      this.setState({currentItems: this.state.items})
      return
    }
    
    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }

  deleteOrder(id) {
    this.setState({orders: this.state.orders.filter(el => el.id !== id)}, () => {
      this.setState({notification: {visible: true, message: 'Товар успешно удален!', type: 'error'}})
      setTimeout(() => this.setState({notification: {visible: false, message: '', type: 'error'}}), 2000)
    })
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
        this.setState({notification: {visible: true, message: 'Товар успешно добавлен в корзину!', type: 'success'}})
        setTimeout(() => this.setState({notification: {visible: false, message: '', type: 'success'}}), 2000)
      });
    }
  }
}

export default App;
