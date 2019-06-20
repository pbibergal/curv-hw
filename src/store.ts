import {observable} from "mobx";
import {Transaction} from "./lib/entities";

class TransactionStore {
  @observable list: Transaction[] = [];
  @observable loading = false;

  constructor() {
  }
  addItems(items: Transaction) {
    if (this.list.filter(listItem => listItem.id === items.id).length === 0) {
      this.loading = false;
      this.list.push(items);
    }
  }
}

export default TransactionStore;
