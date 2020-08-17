import React, { useEffect } from "react";

const SelectNumberOfInstallments = ({
  SetNumberOfInstallments,
  HandleReviseAndFinishSale,
}) => {
  useEffect(() => {
    SetNumberOfInstallments(1);
  });

  return (
    <div className="form-group">
      <strong>Número de Parcelas :</strong>
      <select
        className="form-control"
        onChange={(e) => SetNumberOfInstallments(e.target.value)}
      >
        <option value="1">1x</option>
        <option value="2">2x</option>
        <option value="3">3x</option>
        <option value="4">4x</option>
        <option value="5">5x</option>
        <option value="6">6x</option>
        <option value="7">7x</option>
        <option value="8">8x</option>
        <option value="9">9x</option>
        <option value="10">10x</option>
        <option value="11">11x</option>
        <option value="12">12x</option>
        <option value="13">13x</option>
        <option value="14">14x</option>
        <option value="15">15x</option>
        <option value="16">16x</option>
        <option value="17">17x</option>
        <option value="18">18x</option>
        <option value="19">19x</option>
        <option value="20">20x</option>
        <option value="21">22x</option>
        <option value="22">23x</option>
        <option value="23">24x</option>
        <option value="24">25x</option>
      </select>
    </div>
  );
};

export default SelectNumberOfInstallments;
