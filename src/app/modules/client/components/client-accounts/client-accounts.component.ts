import { Component, OnInit, Input } from "@angular/core";
import { AccountService } from "src/app/core/services/account.service";
import { Account } from "src/app/core/models/account.model";
import { AccountStatus } from "src/app/core/enums/account-status.enum";

@Component({
  selector: "app-client-accounts",
  templateUrl: "./client-accounts.component.html",
  styleUrls: ["./client-accounts.component.scss"],
})
export class ClientAccountsComponent implements OnInit {
  cardTitle = "კლიენტის ანგარიშები";
  accounts: Account[];

  accountTypes: string[] = [null, "მიმდინარე", "შემნახველი", "დაგროვებითი"];

  @Input() clientId;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getAccounts(this.clientId);
  }

  getAccounts(id: number): void {
    this.accountService
      .getAccounts(id)
      .subscribe((res: Account[]) => (this.accounts = res));
  }

  toggleStatus(account: Account): void {
    account.accountStatus =
      account.accountStatus === AccountStatus.Active
        ? AccountStatus.Inactive
        : AccountStatus.Active;
    this.accountService
      .editAccount(account.id, account)
      .subscribe((res: Account) => {
        if (res) {
          this.getAccounts(this.clientId);
        }
      });
  }
}
