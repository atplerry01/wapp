import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { MICRRoutingModule } from "./micr.routing";

@NgModule({
  imports: [SharedModule, MICRRoutingModule],
  declarations: []
})
export class MICRModule {}
